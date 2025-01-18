"use client";

import React, { useContext, useEffect, useState } from "react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { motion } from "motion/react";
import { CursorContext } from "@/context/cursor-context";
import { Share_Tech } from "next/font/google";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const PronitesControl = () => {
  const [toggle, setToggle] = useState(true);
  const { setIsHovered } = useContext(CursorContext);

  useEffect(() => {
    setTimeout(() => {
      setToggle(false);
    }, 1500);
  }, []);

  return (
    <motion.div
      className="absolute right-0 top-0 z-10 hidden h-full grid-cols-[64px_auto] md:grid"
      animate={{ width: toggle ? "auto" : "64px" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div
        className="relative h-full w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setToggle(!toggle)}
      >
        <motion.div
          className="flex h-16 w-screen flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase md:top-0 md:w-[100vh] md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:rotate-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MarqueeContainer
            text={[
              "more details",
              "test pronite",
              "xpecto '25",
              "more details",
              "test pronite",
              "xpecto '25",
            ]}
          />
        </motion.div>
      </div>
      <div className="flex h-full w-full flex-col gap-5 overflow-clip bg-neutral-950/[0.5] px-12 py-5 pt-32 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: toggle ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="whitespace-nowrap"
        >
          <div className={`${sharetech.className} text-xl tracking-tight`}>
            Featuring
          </div>
          <div className="text-4xl font-normal uppercase">DJ HABIbi wallah</div>
        </motion.div>
        <div className="h-[2px] w-full max-w-16 bg-amber-50"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: toggle ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="whitespace-nowrap"
        >
          <div className={`${sharetech.className} text-xl tracking-tight`}>
            Date
          </div>
          <div className="text-4xl font-normal uppercase">
            {new Date("12-22-2025 17:34").toLocaleDateString()}
          </div>
        </motion.div>
        <div className="h-[2px] w-full max-w-16 bg-amber-50"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: toggle ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="whitespace-nowrap"
        >
          <div className={`${sharetech.className} text-xl tracking-tight`}>
            Time
          </div>
          <div className="text-4xl font-normal uppercase">
            {new Date("12-22-2025 17:34").toLocaleTimeString()} -{" "}
            {new Date("12-22-2025 19:34").toLocaleTimeString()}
          </div>
        </motion.div>
        <div className="h-[2px] w-full max-w-16 bg-amber-50"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: toggle ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="whitespace-nowrap"
        >
          <div className={`${sharetech.className} text-xl tracking-tight`}>
            Venue
          </div>
          <div className="text-4xl font-normal uppercase">Your mom</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PronitesControl;
