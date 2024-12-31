"use client";

import React, { useContext } from "react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { motion } from "motion/react";
import styles from "@/styles/intro.module.css";
import Image from "next/image";
import IntroPic from "../../../../public/intro.png";
import Hehe from "../../../../public/meme.png";
import { Share_Tech } from "next/font/google";
import { CursorContext } from "@/context/cursor-context";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const IntroScreen = () => {
  const { isHovered, setIsHovered } = useContext(CursorContext);

  return (
    <div className="relative flex h-full w-screen items-center justify-center bg-neutral-900 p-5 pb-20 sm:h-[calc(100vh-128px)] md:p-12 md:pb-32">
      <motion.div
        className={styles.introBorder}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
      >
        <Image
          src={IntroPic}
          alt={"Intro picture"}
          className="absolute left-[2px] top-[2px] z-10 flex h-[calc(100%-4px)] w-[calc(100%-4px)] object-cover object-bottom"
        />
        <div className="absolute left-[2px] top-[2px] z-10 flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-end justify-start p-5 md:p-5">
          <div className="w-full max-w-screen-sm xl:max-w-screen-md">
            <div className="text-6xl font-semibold uppercase">
              what is xpecto
            </div>
            <div
              className={`${sharetech.className} mt-2.5 text-base tracking-tight sm:text-lg`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ut lacus ac tortor eleifend scelerisque non sed ante. Interdum et
              malesuada fames ac ante ipsum primis in faucibus. Nam venenatis
              finibus magna, vitae dapibus sem convallis a. Proin lectus metus,
              congue eu velit eu, egestas cursus ex. Donec faucibus vitae tortor
              at tincidunt. Mauris vitae eros eget lacus sagittis interdum a non
              lacus. Sed sit amet mauris urna. Vestibulum tempor quam luctus est
              fermentum lobortis. Duis imperdiet tincidunt tortor sed congue.
              Donec a viverra turpis, quis condimentum nisi. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Vivamus ut lacus ac tortor
              eleifend scelerisque non sed ante.
            </div>
          </div>
        </div>
        <Image
          src={Hehe}
          alt={"hehe"}
          className="absolute bottom-[2px] right-[2px] z-10 hidden h-64 w-64 object-cover lg:block"
        />
      </motion.div>
      <motion.div
        className={`absolute bottom-0 left-0 flex h-16 w-full flex-row items-center overflow-hidden border-y-2 border-amber-50 bg-amber-50 text-4xl font-normal uppercase text-neutral-900`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.a
          className="flex h-full w-full cursor-none flex-col items-center justify-center"
          initial={{ translateY: -50, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.125 }}
          href={"/about"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
        </motion.a>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
