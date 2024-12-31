"use client";

import React, { useState } from "react";
import Image from "next/image";
import BgImage from "public/transparent-bg.png";
import { motion } from "motion/react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const CompCard = () => {
  const [mouseOn, setMouseOn] = useState(false);

  return (
    <div
      className="relative z-0 min-h-96 w-full overflow-clip border border-amber-50"
      onMouseEnter={() => setMouseOn(true)}
      onMouseLeave={() => setMouseOn(false)}
    >
      <Image
        src={BgImage}
        alt={"transparent bg"}
        width={768}
        height={576}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-bottom"
      />
      <motion.div
        className="absolute bottom-16 left-0 w-full border-t-2 border-amber-50 bg-neutral-900/[0.5] p-2.5 text-2xl font-medium uppercase"
        animate={
          mouseOn
            ? { opacity: 1, translateY: 0 }
            : { opacity: 0, translateY: 100 }
        }
        transition={{ duration: 0.5, ease: "circOut" }}
      >
        Hello, world
      </motion.div>
      <div
        className={`absolute bottom-0 left-0 flex h-16 w-full flex-row items-center overflow-hidden border-t-2 border-amber-50 bg-neutral-900/[0.7] text-4xl font-normal uppercase text-amber-50`}
      >
        <motion.span
          className="flex h-full w-full cursor-none flex-col items-center justify-center"
          initial={{ translateY: -50, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: Math.random() }}
        >
          <MarqueeContainer
            text={[
              "you have reached the end",
              "that's all we have for now",
              "you have reached the end",
              "that's all we have for now",
            ]}
            delay={1}
          />
        </motion.span>
      </div>
      <div className="absolute bottom-0 right-0 flex h-16 w-full max-w-36 flex-col items-center justify-center border-l-2 border-t-2 border-amber-50 bg-amber-50 text-3xl uppercase text-neutral-900">
        register
      </div>
    </div>
  );
};

export default CompCard;
