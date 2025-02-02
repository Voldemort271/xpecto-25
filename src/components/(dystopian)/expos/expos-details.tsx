"use client";

import React, { type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import { Share_Tech } from "next/font/google";
import { motion } from "motion/react";
import ExposControlMobile from "@/components/(dystopian)/expos/expos-control-mobile";
import { type ExpoWithDetails } from "@/app/types";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const keyframes = {
  flicker: {
    opacity: [0, 1, 0.3, 0.7, 0.3, 1, 0.3, 1, 0.3, 1, 0.3, 1],
  },
};

interface Props {
  expos: ExpoWithDetails;

  index: number;
  length: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const ExposDetails = ({ expos, index, length, setIndex }: Props) => {
  return (
    <div className="relative h-full w-full">
      <Image
        src={
            expos.exposDetails.cover ??
          `https://res.cloudinary.com/diqdg481x/image/upload/v1737737277/background_eqguit.jpg`
        }
        width={1920}
        height={1080}
        alt={expos.exposDetails.name}
        className="absolute left-0 top-32 -z-20 h-full w-full object-cover object-center opacity-100 sm:top-0"
      />
      <div className="absolute left-0 top-32 -z-10 h-full w-full bg-gradient-to-r from-black/[0.5] to-black/[0.7] sm:top-0"></div>
      <div className="flex min-h-screen w-full flex-col items-start justify-between gap-12 p-12 pr-12 pt-44 md:pr-28">
        <div className="flex flex-col items-end gap-2 self-end">
          <div className="flex flex-wrap items-center gap-2">
            <motion.div
              className="rounded-full bg-neutral-700 px-5 py-1 text-base uppercase text-amber-50"
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3, delay: 1 }}
            >
              musical
            </motion.div>
            <motion.div
              className="rounded-full bg-neutral-700 px-5 py-1 text-base uppercase text-amber-50"
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            >
              premium
            </motion.div>
          </div>
          <motion.div
            className="text-right text-6xl font-bold uppercase sm:text-8xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {expos.exposDetails.name}
          </motion.div>
          <motion.div
            className={`max-w-screen-sm text-right text-lg ${sharetech.className} tracking-tight text-amber-50`}
            initial={{ opacity: 0, translateX: 200 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {expos.exposDetails.description}
          </motion.div>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-12 sm:flex-row sm:items-end">
          <div className="flex flex-col">
            <motion.div
              className="text-4xl font-extralight uppercase text-amber-50/[0.7]"
              variants={keyframes}
              animate="flicker"
              transition={{
                duration: 1,
                ease: "linear",
                delay: 1.25,
                repeat: 1,
              }}
            >
              #00{index + 1}
            </motion.div>
            <motion.div
              className="text-xl font-extralight uppercase text-amber-50/[0.7]"
              variants={keyframes}
              animate="flicker"
              transition={{
                duration: 1,
                ease: "linear",
                delay: 1.5,
                repeat: 1,
              }}
            >
              exhibit: {expos.exposDetails.slug}
            </motion.div>
            <motion.div
              className="text-xl font-extralight uppercase text-amber-50/[0.7]"
              variants={keyframes}
              animate="flicker"
              transition={{
                duration: 1,
                ease: "linear",
                delay: 1.75,
                repeat: 1,
              }}
            >
              timeline: {expos.exposDetails.begin_time.toLocaleDateString()}{" "}
              - {expos.exposDetails.end_time.toLocaleDateString()}
            </motion.div>
            <motion.div
              className="text-base font-extralight uppercase text-amber-50/[0.5]"
              variants={keyframes}
              animate="flicker"
              transition={{
                duration: 1,
                ease: "linear",
                delay: 2,
                repeat: 1,
              }}
            >
              unique archive registrar {expos.id.substring(2, 10)}
            </motion.div>
          </div>
          <div className="flex gap-12">
            <div className="text-lg font-light uppercase text-amber-50">
              &lt;&lt; prev
            </div>
            <div className="text-lg font-light uppercase text-amber-50">
              next &gt;&gt;
            </div>
          </div>
        </div>
      </div>
      <ExposControlMobile
        expos={expos}
        length={length}
        index={index}
        setIndex={setIndex}
      />
    </div>
  );
};

export default ExposDetails ;
