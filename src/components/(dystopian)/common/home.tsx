"use client";

import React from "react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import ClickToStart from "@/components/(dystopian)/common/click-to-start";
import { motion } from "motion/react";
import Image from "next/image";
import BgImage from "public/images/transparent-bg.png";
import LandingText from "@/components/(dystopian)/home/landing-text";
import styles from "@/styles/home.module.css";

// TODO: Shift bottom marquee animation when landing animation is ready

const HomeScreen = () => {
  return (
    <div className="relative z-0 h-[calc(100vh-2px)] w-full overflow-clip bg-neutral-900">
      <Image
        src={BgImage}
        alt={"transparent bg"}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-bottom"
      />
      <motion.div
        className={`absolute left-0 top-0 -z-10 hidden h-full w-full stroke-black p-12 text-2xl font-medium text-indigo-600 sm:block ${styles.homeStatic}`}
        initial={{ display: "block" }}
        animate={{ display: "none" }}
        transition={{ duration: 0.2, delay: 3.5 }}
      >
        PLEASE WAIT, LOADING
      </motion.div>
      <motion.div
        className={`absolute left-0 top-0 -z-10 block h-full w-full sm:hidden ${styles.homeStaticMobile}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, display: "none" }}
        transition={{ duration: 0.2, delay: 3.5 }}
      ></motion.div>
      <div className="h-32 sm:h-16"></div>
      <div className="flex h-[calc(100vh-194px)] w-full flex-col items-center justify-center uppercase text-amber-50 sm:h-[calc(100vh-130px)] md:text-amber-50">
        <motion.div
          className="text-4xl font-medium uppercase sm:text-6xl md:-mb-5 md:font-semibold"
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: 6.5 }}
        >
          welcome to
        </motion.div>
        <motion.div
          className="text-8xl font-extrabold uppercase sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
        >
          Xpecto &apos;25
        </motion.div>
        <LandingText />
        <motion.div
          className="text-4xl font-medium uppercase sm:text-6xl md:-mt-5 md:font-semibold"
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: 6.5 }}
        >
          by iit mandi
        </motion.div>
        <motion.div
          className="relative text-amber-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 9 }}
        >
          <ClickToStart />
        </motion.div>
      </div>
      <motion.div
        className={`absolute bottom-0 left-0 flex h-16 w-full flex-row items-center overflow-hidden border-y-2 border-amber-50 bg-neutral-900 text-4xl font-normal uppercase`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 7.5 }}
      >
        <motion.span
          className="flex h-full w-full flex-col items-center justify-center"
          initial={{ translateY: -50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 8 }}
        >
          <MarqueeContainer
            text={[
              "the biggest fest of the himalayas",
              "32 to 56 march 2025",
              "the biggest fest of the himalayas",
              "32 to 56 march 2025",
            ]}
            delay={0.25}
          />
        </motion.span>
      </motion.div>
    </div>
  );
};

export default HomeScreen;
