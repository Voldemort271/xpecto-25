"use client";

import React, { useContext } from "react";
import Image from "next/image";
import BgImage from "public/transparent-bg.png";
import { motion } from "motion/react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import { CursorContext } from "@/context/cursor-context";
import Link from "next/link";

interface Props {
  title: string;
  details: string;
  img?: string | StaticImport;
  animationDelay?: number;
}

const CompCard = (props: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="relative z-0 min-h-96 w-full overflow-clip border border-amber-50">
      <Image
        src={props.img ?? BgImage}
        alt={props.title || "Untitled"}
        width={768}
        height={576}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-bottom"
      />
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
            text={
              props.title
                ? [props.title, props.title, props.title]
                : ["loading", "loading", "loading"]
            }
            delay={1}
          />
        </motion.span>
      </div>
      <Link
        href={`/competitions/${props.title}`}
        className="absolute bottom-0 right-0 flex h-16 w-full max-w-36 cursor-none flex-col items-center justify-center border-l-2 border-t-2 border-amber-50 bg-amber-50 text-3xl uppercase text-neutral-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        register
      </Link>
    </div>
  );
};

export default CompCard;
