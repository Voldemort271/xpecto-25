"use client";

import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import React, { useContext } from "react";
import PlansSection from "@/components/(test)/plans-section";
import Footer from "@/components/home/footer";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import { useUser } from "@clerk/nextjs";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { currentUser } from "@clerk/nextjs/server";
import PaymentBox from "@/components/common/payment-box";
import MerchPaymentBox from "@/components/merch/payment-box-merch";
import Image from "next/image";
import MerchPlanCard from "@/components/merch/plan-card-merch";
import Loader from "@/components/common/loader";
const Page = () => {
  const { CurrentUser } = useCurrentUser();

  const { data: merch } = api.merch.getMerch.useQuery();
  console.log(CurrentUser);
  console.log("Merch", merch);
  const { setIsHovered } = useContext(CursorContext);
  return (
    <>
      <div className="relative flex justify-evenly bg-neutral-900">
        <div className="flex-col,. relative z-0 col-span-3 flex min-h-96 items-center justify-center border-2 border-amber-50 px-12 py-24 uppercase text-amber-50">
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
          <div className="text-9xl font-bold">Merch</div>
          <div className="text-2xl font-normal"></div>
        </div>
        <div className="flex justify-evenly overflow-y-scroll">
          <div className="m-20 flex w-full flex-row items-center justify-evenly">
            {merch?.map((m, i) => <MerchPlanCard data={m} key={i} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
