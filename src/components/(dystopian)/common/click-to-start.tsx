"use client";

import React, { useContext } from "react";
import { motion } from "motion/react";
import { CursorContext } from "@/context/cursor-context";

// TODO: Extend timeout once landing outro animation is ready

const ClickToStart = () => {
  const { setIsHovered } = useContext(CursorContext);

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
      >
        &lt;&lt; call the time machine &gt;&gt;
      </motion.div>
    </div>
  );
};

export default ClickToStart;
