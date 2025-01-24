"use client";

import React from "react";
import { motion } from "motion/react";

const TitleSponsor = () => {
  return (
    <motion.div className="relative z-0 h-[500px] w-full overflow-clip border-2 border-amber-50">
      <motion.div
        initial={{ left: "0", translateX: "-100%" }}
        animate={{ left: "100%", translateX: "0%" }}
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
      <div className="relative h-full w-full bg-red-400"></div>
    </motion.div>
  );
};

export default TitleSponsor;
