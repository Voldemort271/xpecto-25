"use client";

import React, { useContext } from "react";
import { motion } from "motion/react";
import { CursorContext } from "@/context/cursor-context";

const ClickToStart = () => {
  const { setIsHovered } = useContext(CursorContext);
  const scrollHeight =
    typeof window !== "undefined" ? window.innerHeight - 208 : 1000;

  return (
    <div className="relative mt-5 w-full">
      <motion.div
        className="w-full px-12 py-5 text-xl font-light"
        initial={{ opacity: 1 }}
        variants={{
          blink: {
            opacity: [1, 0, 1],
          },
        }}
        animate="blink"
        transition={{ duration: 1, repeat: Infinity }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setTimeout(() => {
            window.scrollBy({ top: scrollHeight, behavior: "smooth" });
          }, 1000);
        }}
      >
        click to start
      </motion.div>
    </div>
  );
};

export default ClickToStart;
