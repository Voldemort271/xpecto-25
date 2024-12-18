"use client";

import React, { useContext, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { CursorContext } from "@/context/cursor-context";

const DystopianCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const { isHovered } = useContext(CursorContext);

  // setIsHovered(true);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX - 16);
      cursorY.set(event.clientY - 16);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed z-50 h-8 w-8 rounded-full bg-amber-50 text-neutral-900 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 3 : 1,
      }}
      // transition={springConfig}
    ></motion.div>
  );
};

export default DystopianCursor;
