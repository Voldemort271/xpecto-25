"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

interface Props {
  children: string;
  speed?: number;
}

const Marquee = ({ children, speed }: Props) => {
  const { scrollYProgress } = useScroll(); // Get scroll progress (0 to 1)
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${speed ? speed * 50 : 50}%`],
  );
  const springX = useSpring(x, {
    stiffness: 50,
    damping: 10,
    mass: 1,
  });

  return (
    <div className="flex h-32 w-full flex-col justify-center overflow-hidden whitespace-nowrap border-y-2 border-amber-50 bg-neutral-950 text-9xl font-extrabold uppercase text-amber-50/[0.8]">
      <motion.div
        style={{
          display: "inline-block",
          x: springX,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
export default Marquee;
