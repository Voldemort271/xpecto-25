"use client";

import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import React from "react";
import Link from "next/link";
import PlansSection from "@/components/(test)/plans-section";

const Page = () => {
  const { CurrentUser } = useCurrentUser();

  const { data: offlinePlans } = api.event.getOfflinePlans.useQuery();
  offlinePlans?.regPlans.sort((a, b) => a.price - b.price);

  const { data: offlineReg, isLoading } =
    api.registration.checkUserRegisteration.useQuery(
      {
        userId: CurrentUser?.id ?? "",
        eventId: "universaleve",
      },
      {
        enabled: !!CurrentUser,
      },
    );

  return (
    <div>
      {CurrentUser && CurrentUser.id !== "" ? (
        CurrentUser.accomodation ? (
          <div className="pt-32">
            You have an active plan
            {/*//TODO: Add what plan user purchased here. (If IIT Mandi student, say so)*/}
          </div>
        ) : isLoading ? (
          <div className="pt-32">Loading...</div>
        ) : offlineReg && !offlineReg.verified ? (
          <div className="flex h-full w-full items-center justify-center pt-32">
            <div className="w-fit border-2 bg-amber-50/[0.7] px-5 py-2 text-xl font-normal uppercase text-neutral-900">
              Your payment is being verified right now
            </div>
          </div>
        ) : (
          <PlansSection />
        )
      ) : (
        //TODO: Put a good loader here
        <div className="m-5 h-full border-2 border-amber-50/[0.7] p-5 pt-32 uppercase">
          You need to be logged in to access this site. <br />
          <Link href={"/"} className="cursor-pointer hover:underline">
            go to home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
