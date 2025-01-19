"use client";

import React from "react";
import Image from "next/image";
import BgImage from "public/images/background.jpg";
import { Share_Tech } from "next/font/google";
import { motion } from "motion/react";
import PronitesControlMobile from "@/components/(dystopian)/pronites/pronites-control-mobile";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const keyframes = {
  flicker: {
    opacity: [0, 1, 0.3, 0.7, 0.3, 1, 0.3, 1, 0.3, 1, 0.3, 1],
  },
};

const PronitesDetails = () => {
  return (
    <div className="relative h-full w-full">
      <Image
        src={BgImage}
        alt={"bg image"}
        className="absolute left-0 top-32 -z-20 h-full w-full object-cover object-bottom opacity-100 sm:top-0"
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
            test pronite
          </motion.div>
          <motion.div
            className={`max-w-screen-sm text-right text-lg ${sharetech.className} tracking-tight text-amber-50`}
            initial={{ opacity: 0, translateX: 200 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            cupiditate dolorem dolorum illo itaque, laudantium magnam, nesciunt
            nostrum quo sequi similique voluptatum! Aperiam autem ea est eum
            mollitia nihil voluptas? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Ad animi assumenda commodi cumque deleniti,
            dignissimos dolore earum eius error laborum, nobis repellendus vel,
            vero.
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
                repeat: 2,
              }}
            >
              #001
            </motion.div>
            <motion.div
              className="text-xl font-extralight uppercase text-amber-50/[0.7]"
              variants={keyframes}
              animate="flicker"
              transition={{
                duration: 1,
                ease: "linear",
                delay: 1.5,
                repeat: 2,
              }}
            >
              exhibit: featured celebrity
            </motion.div>
            <motion.div
              className="mb-2 text-xl font-extralight uppercase text-amber-50/[0.7]"
              variants={keyframes}
              animate="flicker"
              transition={{
                duration: 1,
                ease: "linear",
                delay: 1.75,
                repeat: 2,
              }}
            >
              timeline: {new Date("12-2-2024").toLocaleDateString()} -{" "}
              {new Date("12-20-2024").toLocaleDateString()}
            </motion.div>
            <motion.div
              className="text-lg font-extralight uppercase text-amber-50/[0.7]"
              variants={keyframes}
              animate="flicker"
              transition={{
                duration: 1,
                ease: "linear",
                delay: 2,
                repeat: 2,
              }}
            >
              more details &gt;&gt;
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
      <PronitesControlMobile />
    </div>
  );
};

export default PronitesDetails;
