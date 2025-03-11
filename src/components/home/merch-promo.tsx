"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { Share_Tech } from "next/font/google";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import MerchCard from "@/components/home/merch-card";
import { motion } from "motion/react";
import merch_1 from "public/images/merch_1.jpeg";
import merch_2 from "public/images/merch_2.jpeg";
import merch_3 from "public/images/merch_3.jpeg";
import merch_4 from "public/images/merch_4.png";

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
        <motion.div
          initial={{ opacity: 0, translateY: 50 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.2 }}
          className="text-5xl font-bold uppercase sm:text-7xl"
        >
          exciting new merchandise
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateY: 50 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className={`${shareTech.className} mb-5 text-base tracking-tight md:text-lg`}
        >
          While we can’t bend time, our collection makes sure you look
          effortlessly stylish in any timeline. Grab your favorites before they
          vanish into the void of time!
        </motion.div>
        {/* TODO: Replace link when merch store is active */}
        <Link
          href={"/merch"}
          target={"_blank"}
          className="w-fit cursor-none border-2 border-amber-50 bg-amber-50/[0.7] px-5 py-1 text-2xl font-normal uppercase text-neutral-900 backdrop-blur-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          go to store
        </Link>
      </div>
      <MerchCard merchImage={merch_4} alt="Merch item 4" />
      <MerchCard merchImage={merch_1} alt="Merch item 1" />
      <MerchCard merchImage={merch_2} alt="Merch item 2" />
      <MerchCard merchImage={merch_3} alt="Merch item 3" />
    </div>
  );
};

export default MerchPromo;
