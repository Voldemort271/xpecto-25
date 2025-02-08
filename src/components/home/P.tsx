"use client";

import React from "react";
import { motion } from "motion/react";

const PText = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 89.34 179.69"
      className="h-24 md:h-36 lg:h-48"
      initial={{ fill: "#fffbeb00" }}
      animate={{ fill: "#fffbeb" }}
      transition={{ duration: 1, delay: 4.5, ease: "anticipate" }}
    >
      <motion.path
        className="stroke-amber-50 stroke-2"
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
        d="M1,1 L1,178.69 L28.11,178.69 L28.11,118.46 L73.28,118.46 L73.28,103.4 L88.34,103.4 L88.34,16.06 L73.28,16.06 L73.28,1 L1,1 M28.11,28.11 H61.24 V91.36 H28.11 Z"
      />
    </motion.svg>
  );
};

export default PText;
