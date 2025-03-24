"use client";

import React, { useContext, useRef } from "react";
import { motion, useInView } from "motion/react";
import MarqueeContainer from "@/components/common/marquee-container";
import Image from "next/image";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import type { Sponsor } from "@/lib/sponsor-data";

const TitleSponsor = ({ title, name, logo, website, tier }: Sponsor) => {
  const { setIsHovered } = useContext(CursorContext);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      className={`relative z-0 h-full w-full overflow-clip border-2 border-amber-50 ${tier === "title" && "lg:col-span-2"}`}
      ref={ref}
    >
      <motion.div
        className="loading absolute left-0 top-0 z-10 h-full w-full"
        initial={{ display: "block" }}
        animate={{ display: inView ? "none" : "block" }}
        transition={{ duration: 0, delay: 0.5 }}
      ></motion.div>
      <div className="relative grid h-full w-full grid-cols-[48px_auto_48px] overflow-clip overflow-y-auto overscroll-none bg-neutral-900 md:grid-cols-[64px_auto_64px]">
        <div className="relative overflow-clip">
          <div className="top-0 flex h-12 w-[100vh] -translate-x-[calc(50%-24px)] translate-y-[calc(50vh-24px)] -rotate-90 flex-col justify-center overflow-clip border-2 border-r-0 border-t-0 border-amber-50 bg-neutral-900 text-2xl font-light uppercase md:h-16 md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:text-3xl">
            <MarqueeContainer
              text={[
                `presenting ${name}`,
                title,
                "xpecto '25",
                "iit mandi",
                `presenting ${name}`,
                title,
                "xpecto '25",
                "iit mandi",
              ]}
            />
          </div>
        </div>
        <div
          className={`relative z-0 ${
            tier === "title"
              ? "flex min-h-96 flex-col items-center md:flex-row"
              : "flex flex-col items-center"
          }`}
        >
          <Image
            src={logo}
            width={1000}
            height={500}
            alt={name}
            className="max-h-[300px] w-full object-cover object-center"
          />
          <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-r from-neutral-900/[0.5] from-0% to-neutral-900 to-100% p-5 py-12 hover:from-neutral-900/[0.1] hover:to-neutral-900 md:p-12">
            <div className="text-4xl font-semibold uppercase text-amber-50 sm:text-5xl">
              {name}
            </div>
            <div className="mb-2 text-2xl font-normal uppercase text-neutral-500">
              {title}
            </div>
            <Link
              href={website}
              target={"_blank"}
              className="cursor-none border-2 border-amber-50 bg-amber-50/[0.7] px-5 py-2 text-2xl font-normal uppercase text-neutral-900 sm:text-3xl sm:font-light"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              visit page
            </Link>
          </div>
        </div>
        <div className="relative overflow-clip">
          <div className="top-0 flex h-12 w-[100vh] -translate-x-[calc(50%-24px)] translate-y-[calc(50vh-24px)] rotate-90 flex-col justify-center overflow-clip border-2 border-l-0 border-t-0 border-amber-50 bg-neutral-900 text-2xl font-light uppercase md:h-16 md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:text-3xl">
            <MarqueeContainer
              text={[
                `presenting ${name}`,
                title,
                "xpecto '25",
                "iit mandi",
                `presenting ${name}`,
                title,
                "xpecto '25",
                "iit mandi",
              ]}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TitleSponsor;
