"use client";

import React from "react";
import XText from "@/components/home/X";
import PText from "@/components/home/P";
import EText from "@/components/home/E";
import CText from "@/components/home/C";
import TText from "@/components/home/T";
import OText from "@/components/home/O";
import QuoteText from "@/components/home/\'";
import TwoText from "@/components/home/2";
import FiveText from "@/components/home/5";

const LandingText = () => {
  return (
    <div className="hidden items-start gap-2 p-0 sm:flex md:gap-3 md:py-8 lg:gap-5">
      <XText />
      <PText />
      <EText />
      <CText />
      <TText />
      <OText />
      <div className="w-5"></div>
      <QuoteText />
      <TwoText />
      <FiveText />
    </div>
  );
};

export default LandingText;
