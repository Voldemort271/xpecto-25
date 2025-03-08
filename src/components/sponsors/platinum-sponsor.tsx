"use client";

import React, { useContext, useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { Share_Tech } from "next/font/google";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import { type Sponsor } from "@/lib/sponsor-data";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface Props extends Sponsor {
  delay: number;
}

const PlatinumSponsor = ({
  name,
  logo,
  desc,
  website,
  delay,
  title,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div
      className="relative z-0 w-full overflow-clip border-2 border-amber-50 bg-neutral-950"
      ref={ref}
    >
      <motion.div
        className="loading absolute left-0 top-0 z-20 h-full w-full"
        initial={{ display: "block" }}
        animate={{ display: inView ? "none" : "block" }}
        transition={{ delay: 0.5 + delay }}
      ></motion.div>
      <motion.div
        className="absolute left-0 top-0 z-10 h-full w-full bg-neutral-900"
        initial={{ display: "block" }}
        animate={{ display: inView ? "none" : "block" }}
        transition={{ delay: 0.5 + delay }}
      ></motion.div>
      <Link
        href={website}
        target={"_blank"}
        className="flex h-full w-full cursor-none flex-col items-center justify-center p-5 py-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-2.5 text-lg font-light uppercase text-amber-50">
          {name}
        </div>
        <Image
          src={logo}
          width={800}
          height={800}
          alt={name}
          className="mb-2.5 max-h-32 w-full max-w-56 object-contain"
        />
        <div className="mb-2.5 rounded-full bg-neutral-600 px-5 py-1 text-lg font-light uppercase text-amber-50">
          {title}
        </div>
      </Link>
    </div>
  );
};

export default PlatinumSponsor;
