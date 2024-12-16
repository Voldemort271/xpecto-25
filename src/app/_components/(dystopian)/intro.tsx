"use client";

import React from "react";
import MarqueeContainer from "@/app/_components/(dystopian)/marquee-container";
import { motion } from "motion/react";
import styles from "@/styles/intro.module.css";

const IntroScreen = () => {
  return (
    <div className="relative flex h-[calc(100vh-128px)] w-screen items-center justify-center bg-neutral-900 p-5 pb-20 md:p-12 md:pb-32">
      <motion.div className={styles.introBorder}>
        {/*<div className="absolute left-[2px] top-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] bg-neutral-900"></div>*/}
      </motion.div>
      <motion.div
        className={`absolute bottom-0 left-0 flex h-16 w-full flex-row items-center overflow-hidden border-y-2 border-amber-50 bg-amber-50 text-4xl font-normal uppercase text-neutral-900`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="flex h-full w-full flex-col items-center justify-center"
          initial={{ translateY: -50, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.125 }}
        >
          <MarqueeContainer
            text={[
              "click for cool stuff",
              "cool stuff I promise",
              "click for cool stuff",
              "cool stuff I promise",
            ]}
            delay={1}
          />
        </motion.span>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
