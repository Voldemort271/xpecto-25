"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { Share_Tech } from "next/font/google";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import MerchCard from "@/components/home/merch-card";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const MerchPromo = () => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="grid w-full grid-cols-4 xl:grid-cols-3">
      <div className="relative z-0 col-span-4 row-span-1 flex min-h-96 flex-col items-end justify-center border border-amber-50 px-5 py-36 text-right sm:px-12 md:col-span-2 md:row-span-2 xl:col-span-1">
        {/* TODO: Change img to an edited merch mockup when ready */}
        <Image
          src={`https://res.cloudinary.com/diqdg481x/image/upload/v1739200155/images/glitch.jpg`}
          alt={"Glitchy bg"}
          width={800}
          height={800}
          className="absolute left-0 top-0 -z-20 h-full w-full object-cover object-bottom opacity-30 hue-rotate-180"
        />
        <div className="text-5xl font-bold uppercase sm:text-7xl">
          exciting new merchandise
        </div>
        <div
          className={`${shareTech.className} mb-5 text-base tracking-tight md:text-lg`}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
          asperiores autem dolores doloribus, eligendi excepturi exercitationem
          explicabo facilis illum, ipsam labore magni molestias nobis non qui
          repellat similique sint velit!
        </div>
        {/* TODO: Replace link when merch store is active */}
        <Link
          href={"https://www.iitmandi.ac.in/"}
          target={"_blank"}
          className="w-fit cursor-none border-2 border-amber-50 bg-amber-50/[0.7] px-5 py-1 text-2xl font-normal uppercase text-neutral-900 backdrop-blur-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Visit website
        </Link>
      </div>
      <MerchCard />
      <MerchCard />
      <MerchCard />
      <MerchCard />
    </div>
  );
};

export default MerchPromo;
