"use client";

import React, { useState } from "react";
import Image from "next/image";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";

const RejectionBox: React.FC<{ rejectFunc: (reason: string) => void }> = ({
  rejectFunc,
}) => {
  const [rejectionBox, setRejectionBox] = useState("");

  return (
    <div>
      <button
        className="reject-button bg-red-500 px-4 py-2 text-white disabled:bg-red-100"
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
        placeholder="Rejection reason (Compulsory to give something)"
        value={rejectionBox}
        onChange={(e) => setRejectionBox(e.target.value)}
      />
    </div>
  );
};
//This rejection box was just made for dynamism

const Page = () => {
  const { CurrentUser } = useCurrentUser();
  const utils = api.useUtils();

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

  const handleReject = (reason: string) => {
    if (!selectedReg) return;
    rejectPayment.mutate(
      { registrationId: selectedReg.id, reason: reason },
      {
        onSuccess: (e) => {
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
    <div>
      <div className="h-32"></div>
      <div className="flex">
        <div className="w-[64.75%] p-4">
          <div className="flex flex-col gap-4">
            {regs?.map((reg) => (
              <div
                key={reg.id}
                className={`mb-4 flex cursor-pointer border p-4 ${selectedReg?.id === reg.id ? "bg-amber-50 text-neutral-900" : ""}`}
                onClick={() => setSelectedReg(reg)}
              >
                <div className="details-container w-full pl-4">
                  <div className="text-2xl">
                    <strong>Transaction ID:</strong> {reg.paymentId}
                  </div>
                  <div className="text-2xl">
                    Plan PRICE:<strong> Rs. {reg.plan.price}</strong>
                  </div>
                  <p>
                    <strong>Name:</strong> {reg.user.name}
                  </p>
                  <p>
                    <strong>College:</strong> {reg.user.college_name}
                  </p>
                  <p>
                    <strong>Plan:</strong> {reg.plan.name}
                  </p>
                  <p>
                    <strong>Plan Details:</strong> {reg.plan.description}
                  </p>
                  <p>
                    <strong>Event:</strong> {reg.event.name}
                  </p>
                  <p>
                    <strong>Event Details:</strong> {reg.event.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      className="accept-button bg-green-500 px-4 py-2 text-white"
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
        </div>
        <div className="w-[0.25%] bg-amber-50"></div>
        <div className="w-[35%] p-4">
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
