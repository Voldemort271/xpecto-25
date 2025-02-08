"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import { Share_Tech } from "next/font/google";
import { CursorContext } from "@/context/cursor-context";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const Page = () => {
  const { CurrentUser } = useCurrentUser();
  const utils = api.useUtils();
  const { setIsHovered } = useContext(CursorContext);

  const {
    data: regs,
    error,
    isLoading,
  } = api.registration.getUnverifiedRegistrations.useQuery(
    CurrentUser?.clerkId ?? "",
  );

  const [selectedReg, setSelectedReg] = useState<
    NonNullable<typeof regs>[number] | null
  >(null);
  const [rejectionBox, setRejectionBox] = useState("");

  const verifyPayment = api.registration.verifyRegistration.useMutation();
  const rejectPayment = api.registration.rejectRegistration.useMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  //TODO: Some good guy add a loader on the page while handleAccept or handleReject functions are running so that its clear to finance team that they are running and they donot spam the buttons

  const handleAccept = () => {
    if (!selectedReg) return;
    verifyPayment.mutate(
      { registrationId: selectedReg.id },
      {
        onSuccess: (e) => {
          setRejectionBox("");
          setSelectedReg(null);
          utils.registration.getUnverifiedRegistrations.setData(
            CurrentUser?.clerkId ?? "",
            (prevReg) => {
              return prevReg?.filter((reg) => reg.id !== e.id);
            },
          );
        },
      },
    );
  };

  const handleReject = () => {
    if (!selectedReg) return;
    rejectPayment.mutate(
      { registrationId: selectedReg.id, reason: rejectionBox },
      {
        onSuccess: (e) => {
          setRejectionBox("");
          setSelectedReg(null);
          utils.registration.getUnverifiedRegistrations.setData(
            CurrentUser?.clerkId ?? "",
            (prevReg) => {
              return prevReg?.filter((reg) => reg.id !== e.id);
            },
          );
        },
      },
    );
  };

  return (
    <div className="bg-neutral-900">
      <div className="h-32"></div>
      <div
        className={`grid grid-rows-[auto_auto] sm:grid-cols-[auto_400px] sm:grid-rows-1 ${shareTech.className} tracking-tight`}
      >
        <div className="p-4">
          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2 xl:grid-cols-3">
            {regs?.map((reg) => (
              <div
                key={reg.id}
                className={`flex cursor-none border-2 border-amber-50 p-4 ${selectedReg?.id === reg.id ? "bg-amber-50/[0.5] text-neutral-900" : ""}`}
                onClick={() => setSelectedReg(reg)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="details-container w-full pl-4 uppercase">
                  <p className="text-2xl">
                    <strong>Name:</strong> {reg.user.name}
                  </p>
                  <div className="text-xl">
                    <strong>Transaction ID:</strong> {reg.paymentId}
                  </div>
                  <div className="text-xl">
                    Plan PRICE:<strong> Rs. {reg.plan.price}</strong>
                  </div>
                  <p>
                    <strong>College:</strong> {reg.user.college_name}
                  </p>
                  <p>
                    <strong>Plan:</strong> {reg.plan.name}
                  </p>
                  <p>
                    <strong>Event:</strong> {reg.event.name}
                  </p>
                  <div className="mt-4 flex flex-col items-center gap-4">
                    <button
                      className="accept-button w-full bg-green-500 px-4 py-2 text-white"
                      onClick={handleAccept}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button w-full bg-red-500 px-4 py-2 text-white disabled:bg-red-100"
                      onClick={handleReject}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-l-2 border-amber-50 p-4">
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

export default Page;
