"use client";

import React, { type Dispatch, type SetStateAction, useContext } from "react";
import MarqueeContainer from "@/components/common/marquee-container";
import { CursorContext } from "@/context/cursor-context";

interface Props {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  length: number;
}

const CompControl = ({ index, setIndex, length }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div
      className="relative flex h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute left-0 top-0 hidden h-16 w-[50vh] -translate-x-[calc(50%-32px)] translate-y-[calc(25vh-32px)] rotate-90 flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase md:flex"
        onClick={() => {
          setIndex((i) => (i - 1 + length) % length);
        }}
      >
        <MarqueeContainer
          text={[
            "previous event",
            "previous event",
            "previous event",
            "previous event",
          ]}
        />
      </div>
      <div
        className="absolute left-0 top-0 hidden h-16 w-[50vh] -translate-x-[calc(50%-32px)] translate-y-[calc(75vh-32px)] rotate-90 flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase md:flex"
        onClick={() => {
          setIndex((i) => (i + 1 + length) % length);
        }}
      >
        <MarqueeContainer
          text={["next event", "next event", "next event", "next event"]}
        />
      </div>
      <div
        className="relative flex h-14 w-[50vw] flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-4xl font-light uppercase md:hidden"
        onClick={() => {
          setIndex((i) => (i - 1 + length) % length);
        }}
      >
        {"<".repeat(50)}
      </div>
      <div
        className="relative flex h-14 w-[50vw] flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-4xl font-light uppercase md:hidden"
        onClick={() => {
          setIndex((i) => (i + 1 + length) % length);
        }}
      >
        {">".repeat(50)}
      </div>
    </div>
  );
};

export default CompControl;
