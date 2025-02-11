"use client";

import React from "react";
import ClickToStart from "@/components/common/click-to-start";
import { motion } from "motion/react";
import Image from "next/image";
import LandingText from "@/components/home/landing-text";
import styles from "@/styles/home.module.css";

const HomeScreen = () => {
  return (
    <div className="relative z-0 h-[95vh] w-full overflow-clip bg-neutral-900">
      <Image
        src={`https://res.cloudinary.com/diqdg481x/image/upload/v1739200155/images/glitch.jpg`}
        alt={"transparent bg"}
        width={1920} //Added  a sample width and height as it was showing an error without it
        height={1080}
        className="absolute left-0 top-0 -z-20 h-full w-full object-cover object-bottom opacity-50"
      />
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-neutral-900/[0.1] from-80% to-neutral-900" />
      <motion.div
        className={`absolute left-0 top-0 z-0 hidden h-full w-full stroke-black p-12 text-2xl font-medium text-indigo-600 sm:block ${styles.homeStatic}`}
        initial={{ display: "block" }}
        animate={{ display: "none" }}
        transition={{ duration: 0.2, delay: 2 }}
      ></motion.div>
      <motion.div
        className={`absolute left-0 top-0 -z-10 block h-full w-full sm:hidden ${styles.homeStaticMobile}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, display: "none" }}
        transition={{ duration: 0.2, delay: 2 }}
      ></motion.div>
      <div className="h-32 sm:h-16"></div>
      <div className="flex h-[calc(100vh-194px)] w-full flex-col items-center justify-center uppercase text-amber-50 sm:h-[calc(100vh-130px)] md:text-amber-50">
        <motion.div
          className="text-4xl font-medium uppercase sm:text-6xl md:-mb-5 md:font-semibold"
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: 5 }}
        >
          welcome to
        </motion.div>
        <motion.div
          className="text-8xl font-extrabold uppercase sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          Xpecto &apos;25
        </motion.div>
        <LandingText />
        <motion.div
          className="text-4xl font-medium uppercase sm:text-6xl md:-mt-5 md:font-semibold"
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: 5 }}
        >
          by iit mandi
        </motion.div>
        <motion.div
          className="relative text-amber-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 6 }}
        >
          <ClickToStart />
        </motion.div>
        <motion.div
          className="absolute -bottom-24 left-1/2 hidden w-full -translate-x-1/2 -translate-y-1/2 text-center text-9xl font-extralight uppercase text-amber-50/[0.5] sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 7 }}
        >
          scroll&nbsp;down
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;
