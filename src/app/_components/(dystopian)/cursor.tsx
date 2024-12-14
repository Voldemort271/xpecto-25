"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const DystopianCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSize = useMotionValue(32);
  const springConfig = { damping: 50, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorSizeSpring = useSpring(cursorSize, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-8 w-8 rounded-full bg-amber-50 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        size: cursorSizeSpring.get(),
      }}
    ></motion.div>
  );
};

export default DystopianCursor;
