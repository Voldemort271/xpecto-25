"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const Marquee = () => {
  const { scrollYProgress } = useScroll(); // Get scroll progress (0 to 1)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const springX = useSpring(x, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });

  return (
    <div className="flex h-32 w-full flex-col justify-center overflow-hidden whitespace-nowrap border-y-2 border-amber-50 bg-neutral-950 text-9xl font-extrabold uppercase">
      <motion.div
        style={{
          display: "inline-block",
          x: springX,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        architecto, cum delectus eaque eligendi eos est eveniet explicabo fugiat
        laboriosam magnam neque, perferendis praesentium provident quia,
        reprehenderit repudiandae sit voluptatem. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Asperiores aut debitis dolor ea eveniet ex
        facere facilis inventore ipsum laborum laudantium, numquam odio porro
        provident quae qui velit voluptas voluptatum!
      </motion.div>
    </div>
  );
};
export default Marquee;
