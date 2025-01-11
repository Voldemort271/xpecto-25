"use client";

import React from "react";
import { motion } from "motion/react";

const TText = () => {
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
        points="1 1 88.34 1 88.34 28.11 58.22 28.11 58.22 178.69 31.12 178.69 31.12 28.11 1 28.11 1 1"
      />
    </motion.svg>
  );
};

export default TText;
