import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import { Share_Tech } from "next/font/google";
import Image from "next/image";
import PlanCard from "@/components/membership/plan-card";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const PlansSection = () => {
  const { CurrentUser } = useCurrentUser();

  const [regPrice, setRegPrice] = useState(0);
  const [regPlanId, setRegPlanId] = useState("");

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

  useEffect(() => {
    setRegPrice(offlinePlans?.regPlans[0]?.price ?? 0);
    setRegPlanId(offlinePlans?.regPlans[0]?.id ?? "");
  }, [offlinePlans]);

  return (
    <div className="grid w-full grid-cols-3 bg-neutral-900">
      <div className="relative z-0 col-span-3 flex min-h-96 flex-col items-center justify-center border-2 border-amber-50 px-12 py-24 uppercase text-amber-50">
        <Image
          src={
            "https://res.cloudinary.com/diqdg481x/image/upload/v1739198119/images/iitmandi.jpg"
          }
          width={1920}
          height={600}
          alt={"College Pic"}
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center opacity-20"
        />
        <div className="h-16"></div>
        <div className="text-9xl font-bold">memberships</div>
        <div className="text-2xl font-normal">
          A one-time pass to nearly every Xpecto event
        </div>
      </div>
      {offlinePlans?.regPlans.map((reg) => (
        <PlanCard data={reg} key={reg.id} />
      ))}
    </div>
  );
};

export default PlansSection;
