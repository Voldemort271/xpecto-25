"use client";

import React from "react";
import SponsorTitle from "@/components/sponsors/sponsor-title";
import TitleSponsor from "@/components/sponsors/title-sponsor";
import PlatinumSponsor from "@/components/sponsors/platinum-sponsor";
import { sponData } from "@/lib/sponsor-data";
import Footer from "@/components/home/footer";

const SponsorsPage = () => {
  const platSpons = sponData.filter((e) => e.tier === "platinum");

  return (
    <div className="w-full bg-neutral-900">
      <SponsorTitle />
      <div className="grid w-full grid-cols-1 gap-12 bg-neutral-900 p-5 pt-24 md:p-12 lg:grid-cols-2">
        {sponData[0] && <TitleSponsor {...sponData[0]} />}
        {sponData[1] && <TitleSponsor {...sponData[1]} />}
        {sponData[2] && <TitleSponsor {...sponData[2]} />}
      </div>
      <div className="grid w-full grid-cols-1 gap-12 p-5 pt-24 sm:grid-cols-2 md:p-12 lg:grid-cols-3 lg:p-24">
        {platSpons.map((el, i) => (
          <PlatinumSponsor
            key={i}
            delay={(i % 3) * 0.1}
            name={el.name}
            logo={el.logo}
            desc={el.desc}
            website={el.website}
            title={el.title}
            tier={el.tier}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SponsorsPage;
