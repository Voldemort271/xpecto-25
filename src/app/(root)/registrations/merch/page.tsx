"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import { Share_Tech } from "next/font/google";
import { CursorContext } from "@/context/cursor-context";
import Loader from "@/components/common/loader";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const RejectionBox: React.FC<{ rejectFunc: (reason: string) => void }> = ({
  rejectFunc,
}) => {
  const [rejectionBox, setRejectionBox] = useState("");

  return (
    <>
      <button
        className="reject-button w-full bg-red-500 px-4 py-2 text-white disabled:bg-red-100"
        onClick={() => {
          setRejectionBox("");
          rejectFunc(rejectionBox);
        }}
        disabled={rejectionBox === ""}
      >
        Reject
      </button>
      <textarea
        className="w-full border p-2"
        placeholder="Rejection reason"
        value={rejectionBox}
        onChange={(e) => setRejectionBox(e.target.value)}
      />
    </>
  );
};
//This rejection box was just made for dynamism

const ApprovalPage = () => {
  const { CurrentUser } = useCurrentUser();
  const utils = api.useUtils();
  const { setIsHovered } = useContext(CursorContext);

  const {
    data: regs,
    error,
    isLoading,
  } = api.merch.getUnverifiedMerch.useQuery(CurrentUser?.id ?? "");

  const [selectedReg, setSelectedReg] = useState<
    NonNullable<typeof regs>[number] | null
  >(null);

  const verifyPayment = api.merch.verifyMerchOrder.useMutation();
  const rejectPayment = api.merch.rejectMerchOrder.useMutation();

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;


  const handleAccept = () => {
    if (!selectedReg) return;
    verifyPayment.mutate(
      { orderId: selectedReg.id },
      {
        onSuccess: (e) => {
          setSelectedReg(null);
          utils.merch.getUnverifiedMerch.setData(
            CurrentUser?.id ?? "",
            (prevReg) => {
              return prevReg?.filter((reg) => reg.id !== e.id);
            },
          );
        },
      },
    );
  };

  const handleReject = (reason: string) => {
    if (!selectedReg) return;
    rejectPayment.mutate(
      { merchId: selectedReg.id, reason: reason },
      {
        onSuccess: (e) => {
          setSelectedReg(null);
          utils.merch.getUnverifiedMerch.setData(
            CurrentUser?.id ?? "",
            (prevReg) => {
              return e.success
                ? prevReg?.filter((reg) => reg.id != selectedReg.id)
                : prevReg;
            },
          );
        },
      },
    );
  };

  return (
    <div className={`bg-neutral-900 ${sharetech.className} tracking-tight`}>
      <div className="h-32"></div>
      <div className="grid grid-rows-[auto_auto] sm:grid-cols-[auto_400px] sm:grid-rows-1">
        <div className="grid grid-cols-1 gap-2.5 p-4 lg:grid-cols-2 xl:grid-cols-3">
          {regs?.map((reg) => (
            <div
              key={reg.id}
              className={`flex cursor-none border-2 border-amber-50 p-4 ${selectedReg?.id === reg.id ? "bg-amber-50/[0.5] text-neutral-900" : ""}`}
              onClick={() => setSelectedReg(reg)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="details-container w-full">
                <p className="text-xl">
                  <strong>Name:</strong>{" "}
                  {(reg.merch as Array<{ name: string }>)
                    .map((m) => m.name)
                    .join(", ")}
                </p>
                <p className="text-xl">
                  <strong>Email:</strong> {reg.user.email}
                </p>
                <p className="text-xl">
                  <strong>Mobile:</strong> {reg.user.contact}
                </p>
                <div className="text-2xl">
                  <strong className="text-lg">Transaction ID:</strong>{" "}
                  {reg.paymentId}
                </div>
                <div className="text-2xl">
                  Price:
                  <strong className="ml-2">
                    {`Rs. ${reg.totalPrice}`}
                  </strong>
                </div>
                <p>
                  <strong>Quantity:</strong> {reg.quantity}
                </p>
                <p>
                  <strong>Size:</strong> {(reg.sizes as Array<string>).map((s) => s.toString()).join(', ')}
                </p>
                <p>
                  <strong>College:</strong> {reg.user.college_name}
                </p>
                <div className="mt-4 flex flex-col items-center gap-4">
                  <button
                    className="accept-button w-full bg-green-500 px-4 py-2 text-white"
                    onClick={handleAccept}
                  >
                    Accept
                  </button>
                  <RejectionBox rejectFunc={handleReject} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-l border-amber-50/[0.5] p-4">
          {selectedReg ? (
            <Image
              src={`https://res.cloudinary.com/diqdg481x/image/upload/${selectedReg.paymentProof}`}
              alt="Payment Proof"
              className="h-auto w-full"
              height={1200}
              width={400}
            />
          ) : (
            <div>Select a registration to view the payment proof</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalPage;
