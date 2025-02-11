"use client";

import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Share_Tech } from "next/font/google";
import PaymentBox from "@/components/common/payment-box";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const Page = () => {
  const { CurrentUser } = useCurrentUser();

  const [regPrice, setRegPrice] = useState(0);
  const [regPlanId, setRegPlanId] = useState("");

  const { data: offlinePlans } = api.event.getOfflinePlans.useQuery();
  offlinePlans?.regPlans.sort((a, b) => a.price - b.price);

  const { data: offlineReg, isLoading } = api.registration.checkUserRegisteration.useQuery(
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
    <div>
      <div className="h-32"></div>
      {CurrentUser && CurrentUser.id !== "" ? (
        CurrentUser.accomodation ? (
          <div>
            You have an active plan
            {/*//TODO: Add what plan user purchased here. (If IIT Mandi student, say so)*/}
          </div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : offlineReg && !offlineReg.verified ? (
            <div className="flex w-full h-full items-center justify-center">
          <div className="w-fit border-2 bg-amber-50/[0.7] px-5 py-2 text-xl font-normal uppercase text-neutral-900">
            Your payment is being verified right now
          </div>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-8">
            <div className="text-3xl font-bold underline">Membership Plans</div>
            <div className="text-2xl font-light">
              A one time pass to all the events of XPECTO!
            </div>
            <RadioGroup
              onValueChange={(e) => {
                setRegPlanId(e.split(" ")[1]!);
                setRegPrice(parseInt(e.split(" ")[0]!));
              }}
              defaultValue={
                (offlinePlans?.regPlans[0]?.price.toString() ?? "") +
                " " +
                (offlinePlans?.regPlans[0]?.id ?? "")
              }
              className="w-[60%] rounded-lg border-2 p-10"
            >
              {offlinePlans?.regPlans.map((reg) => {
                return (
                  <div
                    key={reg.id}
                    className="mb-2 flex items-center gap-2 px-5"
                  >
                    <RadioGroupItem
                      className="h-8 w-8 rounded-none bg-amber-50/[0.5]"
                      value={reg.price.toString() + " " + reg.id}
                      key={reg.id}
                    />
                    <Label
                      htmlFor={reg.id}
                      className="flex w-full flex-col p-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-xl font-normal uppercase">
                          {reg.name} - ₹{reg.price}
                        </div>
                        <div className="rounded-full bg-gray-500 px-2 py-0.5 text-sm font-light uppercase">
                          {/* //TODO: Make labelling as a border wrapper. So that it looks premium */}
                          {reg.labelling}
                        </div>
                      </div>
                      <div
                        className={`${sharetech.className} mt-1 text-base tracking-tight`}
                      >
                        {reg.description}
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
            <div className="flex w-[60%]">
              <div className="flex w-full justify-end">
                <div className="p-4 text-right text-3xl font-semibold">
                  Price: ₹{regPrice}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="h-full rounded-lg bg-amber-50 p-4 text-2xl font-semibold text-neutral-900">
                      Purchase Plan
                    </button>
                  </DialogTrigger>
                  <PaymentBox
                    regPlanId={regPlanId}
                    price={regPrice}
                    eventId={"universaleve"}
                  />
                </Dialog>
              </div>
            </div>
          </div>
        )
      ) : (
        //TODO: Put a good loader here
        <div>Loading</div>
      )}
    </div>
  );
};

export default Page;
