"use client";

import React from "react";
import { motion } from "motion/react";

const OText = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 89.34 179.69"
      className="h-24 md:h-36 lg:h-48"
      initial={{ fill: "#fffbeb00" }}
      animate={{ fill: "#fffbeb" }}
      transition={{ duration: 1, delay: 6, ease: "anticipate" }}
    >
      <motion.path
        className="stroke-amber-50 stroke-2"
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 3.5, ease: "easeInOut" }}
        d="M1,16.06 L1,163.63 L16.06,163.63 L16.06,178.69 L73.28,178.69 L73.28,163.63 L88.34,163.63 L88.34,16.06 L73.28,16.06 L73.28,1 L16.06,1 L16.06,16.06 L1,16.06 M28.11,28.11 H61.24 V151.59 H28.11 Z"
      />
    </motion.svg>
  );
};

export default OText;
