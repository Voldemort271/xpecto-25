"use client";

import React, {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
} from "react";
import { motion } from "motion/react";
import { CursorContext } from "@/context/cursor-context";

interface Props {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  children: ReactNode;
}

const keyframes = {
  flicker: {
    opacity: [0, 1, 0.3, 0.7, 0.3, 1, 0.3, 1, 0.3, 1, 0.3, 1],
  },
};

const TeamDetailsContainer = ({ setIndex, children }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="h-full w-full bg-neutral-900 md:pt-16">
      <div className="relative flex h-full w-full flex-col items-start justify-between">
        {children}
        <div className="z-0 grid min-w-72 grid-cols-2 p-2.5 pb-12 sm:p-5">
          <motion.div
            className="col-span-2 text-xl font-extralight uppercase text-amber-50"
            variants={keyframes}
            animate="flicker"
            transition={{
              duration: 1,
              ease: "linear",
              repeat: 1,
            }}
          >
            navigate realm
          </motion.div>
          {[0, 1, 2, 3, 4].map((el) => (
            <motion.div
              className="text-lg font-light uppercase text-amber-50/[0.7] transition-all hover:font-light md:font-extralight"
              key={el}
              onClick={() => setIndex(el)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              variants={keyframes}
              animate="flicker"
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: 1,
                delay: 0.5 + el * 0.2,
              }}
            >
              #00{el + 1}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsContainer;
