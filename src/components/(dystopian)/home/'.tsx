"use client";

import React from "react";
import { motion } from "motion/react";

const QuoteText = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44.16 59.22"
      className="h-12 lg:h-16"
      initial={{ fill: "#fffbeb00" }}
      animate={{ fill: "#fffbeb" }}
      transition={{ duration: 1, delay: 6, ease: "anticipate" }}
    >
      <motion.polygon
        className="stroke-amber-50 stroke-2"
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 3.5, ease: "easeInOut" }}
        points="16.06 1 43.16 1 43.16 28.11 35.63 28.11 35.63 43.16 28.11 43.16 28.11 58.22 1 58.22 1 31.12 8.53 31.12 8.53 16.06 16.06 16.06 16.06 1"
      />
    </motion.svg>
  );
};

export default QuoteText;
