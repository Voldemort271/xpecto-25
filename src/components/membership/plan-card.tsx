"use client";

import React, { useContext } from "react";
import { type RegistrationLevel } from "@prisma/client";
import { Share_Tech } from "next/font/google";
import { CursorContext } from "@/context/cursor-context";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PaymentBox from "@/components/common/payment-box";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const PlanCard = ({ data }: { data: RegistrationLevel }) => {

  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="relative z-0 col-span-3 flex flex-col items-center justify-start border-x border-amber-50 px-5 py-12 md:col-span-1">
      <div
        className={`text-7xl font-semibold uppercase ${data.name === "gold" ? "text-amber-300" : data.name === "silver" ? "text-neutral-400" : "text-amber-700"}`}
      >
        {data.name}
      </div>
      <div className="text-2xl font-light uppercase text-neutral-600 line-through">
        ₹{data.price + 500}
      </div>
      <div className="w-full bg-green-700/[0.1] px-5 py-2.5 text-center text-4xl font-normal uppercase text-green-400">
        ₹{data.price}
      </div>
      <div
        className={`whitespace-pre-wrap py-5 ${shareTech.className} pb-20 text-lg tracking-tight`}
      >
        {data.description}
      </div>
      {useUser().isSignedIn ? (
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="absolute bottom-12 left-12 flex h-12 w-fit cursor-none flex-col justify-center self-end border-2 border-amber-50 bg-amber-50/[0.7] px-5 text-2xl uppercase text-neutral-900 hover:underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              buy plan
            </div>
          </DialogTrigger>
          <PaymentBox
            regPlanId={data.id}
            price={data.price}
            eventId={"universaleve"}
          />
        </Dialog>
      ) : (
        <Link
          href={"/sign-in"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute bottom-12 left-12 flex h-12 w-fit cursor-none flex-col justify-center self-end border-2 border-amber-50 bg-amber-50/[0.7] px-5 text-2xl uppercase text-neutral-900 hover:underline"
        >
          buy plan
        </Link>
      )}
    </div>
  );
};

export default PlanCard;
