"use client";

import React from "react";
import { motion } from "motion/react";

const FiveText = () => {
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
        points="1 1 88.34 1 88.34 28.11 28.11 28.11 28.11 68.77 31.12 68.77 31.12 61.23 73.28 61.23 73.28 76.29 88.34 76.29 88.34 163.63 73.28 163.63 73.28 178.69 16.06 178.69 16.06 163.63 1 163.63 1 121.47 28.11 121.47 28.11 151.59 61.23 151.59 61.23 88.34 43.16 88.34 43.16 95.87 28.11 95.87 28.11 103.4 1 103.4 1 1"
      />
    </motion.svg>
  );
};

export default FiveText;
