"use client";

import React from "react";
import { api } from "@/trpc/react";
import SponsorTitle from "@/components/(dystopian)/sponsors/sponsor-title";
import TitleSponsor from "@/components/(dystopian)/sponsors/title-sponsor";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { motion } from "motion/react";
import PlatinumSponsor from "@/components/(dystopian)/sponsors/platinum-sponsor";

const Page = () => {
  const allSponsors = api.sponsor.getSponsor.useQuery({ id: "" }).data; // id="" fetches all spons

  return (
    <div className="w-full bg-neutral-900">
      <SponsorTitle />
      <div className="flex w-full flex-col gap-12 bg-neutral-900 p-5 pt-24 sm:p-12 md:p-24">
        <TitleSponsor />
        <TitleSponsor />
      </div>
      <motion.div
        className="relative flex h-24 flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-6xl font-medium uppercase text-amber-50/[0.7]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MarqueeContainer
          text={[
            "platinum sponsors",
            "platinum sponsors",
            "platinum sponsors",
            "platinum sponsors",
            "platinum sponsors",
          ]}
        />
      </motion.div>
      <div className="grid w-full grid-cols-1 gap-12 p-5 pt-24 sm:grid-cols-2 md:p-12 lg:grid-cols-3 lg:p-24">
        {Array.from({ length: 5 }, (v, i) => i).map((el) => (
          <PlatinumSponsor key={el} delay={(el % 3) * 0.1} />
        ))}
      </div>
    </div>
  );
};

export default Page;
