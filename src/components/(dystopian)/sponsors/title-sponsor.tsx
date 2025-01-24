"use client";

import React from "react";
import { motion } from "motion/react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const TitleSponsor = () => {
  return (
    <motion.div className="relative z-0 h-[500px] w-full overflow-clip border-2 border-amber-50">
      <motion.div
        initial={{ left: "100%", translateX: "0%" }}
        animate={{ left: "0", translateX: "-100%" }}
        transition={{ duration: 5, delay: 0.5 }}
        className="pointer-events-none absolute left-0 top-0 z-20 w-fit border-x-2 border-amber-50 bg-neutral-900 px-36 text-[496px] font-extrabold uppercase leading-none"
      >
        title&nbsp;sponsor
      </motion.div>
      <motion.div
        className="loading absolute left-0 top-0 z-10 h-full w-full"
        initial={{ display: "block" }}
        animate={{ display: "none" }}
        transition={{ duration: 0, delay: 2.5 }}
      ></motion.div>
      <div className="relative grid h-full w-full grid-cols-[48px_auto_48px] bg-red-400 md:grid-cols-[64px_auto_64px]">
        <div className="relative">
          <div className="top-0 flex h-12 w-[100vh] -translate-x-[calc(50%-24px)] translate-y-[calc(50vh-24px)] -rotate-90 flex-col justify-center overflow-clip border-2 border-r-0 border-t-0 border-amber-50 bg-neutral-900 text-2xl font-light uppercase md:h-16 md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:text-3xl">
            <MarqueeContainer
              text={[
                "presenting logitech",
                "title sponsor",
                "xpecto '25",
                "iit mandi",
                "presenting logitech",
                "title sponsor",
                "xpecto '25",
                "iit mandi",
              ]}
            />
          </div>
        </div>
        <div className="bg-blue-500"></div>
        <div className="relative">
          <div className="top-0 flex h-12 w-[100vh] -translate-x-[calc(50%-24px)] translate-y-[calc(50vh-24px)] rotate-90 flex-col justify-center overflow-clip border-2 border-l-0 border-t-0 border-amber-50 bg-neutral-900 text-2xl font-light uppercase md:h-16 md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:text-3xl">
            <MarqueeContainer
              text={[
                "presenting logitech",
                "title sponsor",
                "xpecto '25",
                "iit mandi",
                "presenting logitech",
                "title sponsor",
                "xpecto '25",
                "iit mandi",
              ]}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TitleSponsor;
