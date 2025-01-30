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

const MemberDetailsContainer = ({ setIndex, children }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="h-full w-full bg-neutral-900 md:pt-16">
      {/* TODO: Add "back to home" link */}
      {/* TODO: Display controls at bottom right in a tech-like fashion */}
      <div className="relative flex h-full w-full flex-col items-start justify-between">
        {children}
        <div className="flex flex-col p-2.5 sm:p-5">
          <motion.div
            className="text-xl font-extralight uppercase text-amber-50/[0.7]"
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
              className="text-lg font-extralight uppercase text-amber-50/[0.7] transition-all hover:font-light"
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

export default MemberDetailsContainer;
