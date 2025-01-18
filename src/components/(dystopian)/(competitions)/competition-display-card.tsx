"use client";

import React, { type ReactNode } from "react";
import BgImage from "public/images/signin.jpg";
import Image from "next/image";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { Share_Tech } from "next/font/google";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import { motion } from "motion/react";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface Props {
  title: string;
  children: ReactNode;
  img?: string | StaticImport;
  slug: string;
  begin_time: Date;
  end_time: Date;
}

const CompDisplayCard = (props: Props) => {
  return (
    <motion.div
      className="relative flex w-full flex-col items-center md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Image
        src={props.img ?? BgImage}
        alt={props.title}
        width={500}
        height={500}
        className="z-10 -mt-40 aspect-square min-h-96 w-[calc(100%-100px)] max-w-[500px] border-2 border-amber-50 object-cover md:-ml-40 md:mt-0 md:h-[400px] md:w-[400px] lg:-ml-32 lg:h-[450px] lg:w-[450px]"
      />
      <div className="mt-12 flex w-full flex-col gap-5 md:mt-0">
        <div className="flex flex-wrap items-baseline gap-2.5 px-5">
          <motion.div
            className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            programming
          </motion.div>
          <motion.div
            className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, delay: 1.1 }}
          >
            ml/ai
          </motion.div>
        </div>
        <motion.div
          className="px-5 text-6xl font-bold uppercase lg:text-7xl"
          initial={{ opacity: 0, translateX: -100 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {props.title || "Upcoming Event"}
        </motion.div>
        <motion.div
          className={`max-w-screen-md px-5 ${sharetech.className} text-lg tracking-tight`}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {props.children}
        </motion.div>
        <motion.div
          className="mt-12 flex h-16 w-full flex-col justify-center overflow-clip border-2 border-l-0 border-amber-50 bg-amber-50/[0.7] text-3xl font-normal uppercase text-neutral-900 md:h-12 md:text-2xl"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 2, delay: 1, ease: "anticipate" }}
        >
          <MarqueeContainer
            text={[
              "view all details",
              props.title || "Upcoming Event",
              props.begin_time.toLocaleString() +
                " to " +
                props.end_time.toLocaleString(),
              "register for " + (props.title || "upcoming event"),
            ]}
            href={`/competitions/${props.slug}`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompDisplayCard;
