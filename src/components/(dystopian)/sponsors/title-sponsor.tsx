"use client";

import React from "react";
import { motion } from "motion/react";

const TitleSponsor = () => {
  return (
    <motion.div className="relative z-0 h-[500px] w-full overflow-clip border-2 border-amber-50">
      <motion.div
        className="pointer-events-none absolute z-20 w-fit border-x-2 border-amber-50 bg-neutral-900 px-36 text-9xl font-extrabold uppercase leading-none sm:text-[496px]"
        initial={{ left: "-150%" }}
        animate={{ left: "100%" }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        title&nbsp;sponsor
      </motion.div>
      <motion.div
        className="loading absolute left-0 top-0 z-10 h-full w-full"
        initial={{ display: "block" }}
        animate={{ display: "none" }}
        transition={{ duration: 0, delay: 1 }}
      ></motion.div>
      hi
    </motion.div>
  );
};

export default TitleSponsor;
