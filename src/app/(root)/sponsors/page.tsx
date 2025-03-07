"use client";

import React from "react";
import { api } from "@/trpc/react";
import SponsorTitle from "@/components/sponsors/sponsor-title";
import TitleSponsor from "@/components/sponsors/title-sponsor";
import MarqueeContainer from "@/components/common/marquee-container";
import { motion } from "motion/react";
import PlatinumSponsor from "@/components/sponsors/platinum-sponsor";
import GenericSponsor from "@/components/sponsors/generic-sponsor";
import Loader from "@/components/common/loader";
import { sponData } from "@/lib/sponsor-data";

const SponsorsPage = () => {
  const { data: allSponsors, isLoading } = api.sponsor.getSponsor.useQuery({
    id: "",
  });

  const platSpons = sponData.filter((e) => e.tier === "platinum");

  if (isLoading || !allSponsors) {
    return <Loader loadingText="Loading Sponsors ..." />;
  }

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
        {platSpons.map((el, i) => (
          <PlatinumSponsor
            key={i}
            delay={(i % 3) * 0.1}
            name={el.name}
            img={el.img}
            desc={el.desc}
            link={el.link}
            title={el.title}
            tier={el.tier}
          />
        ))}
      </div>
      <div className="h-1 w-full bg-amber-50/[0.5]"></div>
      <div className="grid w-full grid-cols-1 gap-12 p-5 pt-24 sm:grid-cols-2 md:p-12 lg:grid-cols-3 lg:p-24">
        {Array.from({ length: 12 }, (v, i) => i).map((el) => (
          <GenericSponsor
            key={el}
            tier={el % 3 == 0 ? "gold" : el % 3 == 1 ? "silver" : "bronze"}
            name={"sample"}
            link={"/"}
          />
        ))}
      </div>
    </div>
  );
};

export default SponsorsPage;
