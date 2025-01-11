"use client";

import React from "react";
import { motion } from "motion/react";

const CText = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 89.34 179.69"
      className="h-24 md:h-36 lg:h-48"
      initial={{ fill: "#fffbeb00" }}
      animate={{ fill: "#fffbeb" }}
      transition={{ duration: 1, delay: 6, ease: "anticipate" }}
    >
      <motion.polygon
        className="stroke-amber-50 stroke-2"
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 3.5, ease: "easeInOut" }}
        points="1 16.06 1 163.63 16.06 163.63 16.06 178.69 73.28 178.69 73.28 163.63 88.34 163.63 88.34 121.47 61.24 121.47 61.24 151.59 28.11 151.59 28.11 28.11 61.24 28.11 61.24 58.22 88.34 58.22 88.34 16.06 73.28 16.06 73.28 1 16.06 1 16.06 16.06 1 16.06"
      />
    </motion.svg>
  );
};

export default CText;
