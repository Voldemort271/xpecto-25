"use client";

import React, { useContext, useRef } from "react";
import { motion, useInView } from "motion/react";
import MarqueeContainer from "@/components/common/marquee-container";
import Image from "next/image";
import { Share_Tech } from "next/font/google";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const TitleSponsor = () => {
  const { setIsHovered } = useContext(CursorContext);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      className="relative z-0 h-[500px] w-full overflow-clip border-2 border-amber-50"
      ref={ref}
    >
      <motion.div
        initial={{ left: "100%", translateX: "0%" }}
        animate={{
          left: inView ? "0" : "100%",
          translateX: inView ? "-100%" : "0",
        }}
        transition={{ duration: 5, delay: 0.5 }}
        className="pointer-events-none absolute left-0 top-0 z-20 w-fit select-none border-x-2 border-amber-50 bg-neutral-900 px-36 text-[496px] font-extrabold uppercase leading-none"
      >
        title&nbsp;sponsor
      </motion.div>
      <motion.div
        className="loading absolute left-0 top-0 z-10 h-full w-full"
        initial={{ display: "block" }}
        animate={{ display: inView ? "none" : "block" }}
        transition={{ duration: 0, delay: 2.5 }}
      ></motion.div>
      <div className="relative grid h-full w-full grid-cols-[48px_auto_48px] overflow-clip overflow-y-scroll overscroll-none bg-neutral-900 md:grid-cols-[64px_auto_64px]">
        <div className="relative overflow-clip">
          <div className="top-0 flex h-12 w-[100vh] -translate-x-[calc(50%-24px)] translate-y-[calc(50vh-24px)] -rotate-90 flex-col justify-center overflow-clip border-2 border-r-0 border-t-0 border-amber-50 bg-neutral-900 text-2xl font-light uppercase md:h-16 md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:text-3xl">
            <MarqueeContainer
              text={[
                "presenting logitech",
                "title sponsor",
                "xpecto '25",
                "iit mandi",
                "presenting logitech",
                "title sponsor",
                "xpecto '25",
                "iit mandi",
              ]}
            />
          </div>
        </div>
        <div className="relative z-0 flex flex-col gap-5">
          <Image
            src={`https://res.cloudinary.com/diqdg481x/image/upload/v1737737280/signin_iiaec7.jpg`}
            width={1000}
            height={500}
            alt={"Title Sponsor"}
            className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center"
          />
          <div className="relative flex h-full w-full flex-col items-end justify-start bg-gradient-to-r from-neutral-900/[0.5] from-0% to-neutral-900 to-100% p-5 py-12 hover:from-neutral-900/[0.1] hover:to-neutral-900 md:p-12">
            <div className="mb-2.5 flex flex-row flex-wrap justify-end gap-2.5">
              <div className="rounded-full bg-neutral-600 px-3 py-1 text-base font-light uppercase text-amber-50">
                electronics
              </div>
              <div className="rounded-full bg-neutral-600 px-3 py-1 text-base font-light uppercase text-amber-50">
                gaming
              </div>
            </div>
            <div className="mb-2 text-5xl font-semibold uppercase text-amber-50 sm:text-6xl md:text-7xl">
              logitech<span className="font-extralight">&reg;</span>
            </div>
            <div
              className={`mb-5 max-w-screen-sm text-right text-base sm:text-lg ${sharetech.className} tracking-tight`}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
              culpa harum ratione voluptas. Dolorem itaque magnam nemo suscipit
              vitae! Animi delectus dolore exercitationem iste, nihil nostrum
              praesentium quo reiciendis repellat. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </div>
            <Link
              href={"/public"}
              target={"_blank"}
              className="cursor-none border-2 border-amber-50 bg-amber-50/[0.7] px-5 py-2 text-3xl font-light uppercase text-neutral-900"
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
                "presenting logitech",
                "title sponsor",
                "xpecto '25",
                "iit mandi",
                "presenting logitech",
                "title sponsor",
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
