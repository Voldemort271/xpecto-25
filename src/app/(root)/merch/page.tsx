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
const Page = () => {
  const { CurrentUser } = useCurrentUser();

  const { data: merch } = api.merch.getMerch.useQuery();
  console.log(CurrentUser);
  console.log("Merch", merch);
  const { setIsHovered } = useContext(CursorContext);
  return (
    <>
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
          <div className="text-9xl font-bold">Merch</div>
          <div className="text-2xl font-normal"></div>
        </div>
        <div
          style={{
            display: "flex",
            flex: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "5rem",
              alignContent: "center",
            }}
          >
            {merch?.map((m, i) => <MerchPlanCard data={m} key={i} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

// <div className="relative z-0 col-span-3 flex flex-col items-center justify-start border-x border-amber-50 px-5 py-12 md:col-span-1">
//       <div
//         className={`text-7xl font-semibold uppercase ${data.name === "gold" ? "text-amber-300" : data.name === "silver" ? "text-neutral-400" : "text-amber-700"}`}
//       >
//         {data.name}
//       </div>
//       <div className="text-2xl font-light uppercase text-neutral-600 line-through">
//         ₹{data.price + 500}
//       </div>
//       <div className="w-full bg-green-700/[0.1] px-5 py-2.5 text-center text-4xl font-normal uppercase text-green-400">
//         ₹{data.price}
//       </div>
//       <div
//         className={`whitespace-pre-wrap py-5 ${shareTech.className} pb-20 text-lg tracking-tight`}
//       >
//         {data.description}
//       </div>
//       {useUser().isSignedIn ? (
//         <Dialog>
//           <DialogTrigger asChild>
//             <div
//               className="absolute bottom-12 left-12 flex h-12 w-fit cursor-none flex-col justify-center self-end border-2 border-amber-50 bg-amber-50/[0.7] px-5 text-2xl uppercase text-neutral-900 hover:underline"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               buy plan
//             </div>
//           </DialogTrigger>
//           <PaymentBox
//             regPlanId={data.id}
//             price={data.price}
//             eventId={"universaleve"}
//           />
//         </Dialog>
//       ) : (
//         <Link
//           href={"/sign-in"}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           className="absolute bottom-12 left-12 flex h-12 w-fit cursor-none flex-col justify-center self-end border-2 border-amber-50 bg-amber-50/[0.7] px-5 text-2xl uppercase text-neutral-900 hover:underline"
//         >
//           buy plan
//         </Link>
//       )}
//     </div>
