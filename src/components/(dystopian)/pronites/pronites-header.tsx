"use client";

import React from "react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { motion } from "motion/react";

const PronitesHeader = () => {
  return (
    <div className="h-full w-full bg-neutral-900">
      <motion.div
        className="absolute left-0 top-[126px] z-30 flex h-16 w-screen flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase md:top-0 md:w-[100vh] md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:-rotate-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MarqueeContainer
          text={[
            "pronites",
            "xpecto '25",
            "iit mandi",
            "pronites",
            "xpecto '25",
            "iit mandi",
            "pronites",
            "xpecto '25",
            "iit mandi",
          ]}
        />
      </motion.div>
    </div>
  );
};

export default PronitesHeader;
