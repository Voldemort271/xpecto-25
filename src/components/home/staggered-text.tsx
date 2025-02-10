"use client";

import React from "react";
import { motion } from "motion/react";

const StaggeredText = ({ children }: { children: string }) => {
  return (
    <div className="relative flex text-5xl font-medium uppercase sm:text-6xl sm:font-bold lg:text-8xl">
      {Array.from(children).map((el, i) => (
        <motion.span
          initial={{ opacity: 0, translateY: -20 }}
          whileInView={{
            opacity: 1,
            translateY: 0,
            transition: { duration: 0.3, ease: "easeOut", delay: 0.1 * i },
          }}
          key={i}
          className="whitespace-pre-wrap"
        >
          {el}
        </motion.span>
      ))}
    </div>
  );
};

export default StaggeredText;
