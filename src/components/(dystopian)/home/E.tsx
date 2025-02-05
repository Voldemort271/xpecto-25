"use client";

import React from "react";
import { motion } from "motion/react";

const EText = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 74.28 179.69"
      className="h-24 md:h-36 lg:h-48"
      initial={{ fill: "#fffbeb00" }}
      animate={{ fill: "#fffbeb" }}
      transition={{ duration: 1, delay: 4.5, ease: "anticipate" }}
    >
      <motion.polygon
        className="stroke-amber-50 stroke-2"
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
        points="1 1 1 178.69 73.28 178.69 73.28 151.59 28.11 151.59 28.11 103.4 73.28 103.4 73.28 76.29 28.11 76.29 28.11 28.11 73.28 28.11 73.28 1 1 1"
      />
    </motion.svg>
  );
};

export default EText;
