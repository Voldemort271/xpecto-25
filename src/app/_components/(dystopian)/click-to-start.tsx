"use client";

import React from "react";
import { motion } from "motion/react";

const ClickToStart = () => {
  return (
    <div className="relative mt-5 w-full">
      <motion.div
        className="w-full cursor-none px-12 py-5 text-xl font-light"
        initial={{ opacity: 1 }}
        variants={{
          blink: {
            opacity: [1, 0, 1],
          },
        }}
        animate="blink"
        transition={{ duration: 1, repeat: Infinity }}
        onClick={() => {
          // Add your click handler here
        }}
      >
        click to start
      </motion.div>
    </div>
  );
};

export default ClickToStart;
