"use client";

import React, { useState } from "react";
import ResponsiveCarouselContainer from "@/components/(dystopian)/team/responsive-carousel-container";
import ResponsiveCarousel from "@/components/(dystopian)/team/responsive-carousel";
import DetailsContainer from "@/components/(dystopian)/team/details-container";
import DetailsView from "@/components/(dystopian)/team/details-view";
import { teamData } from "@/lib/team-data";

const TeamPage = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
      <ResponsiveCarouselContainer data={teamData[index]}>
        <ResponsiveCarousel data={teamData} index={index} setIndex={setIndex} />
      </ResponsiveCarouselContainer>
      <DetailsContainer index={index} setIndex={setIndex}>
        <DetailsView data={teamData[index]} key={index} />
      </DetailsContainer>
    </div>
  );
};

export default TeamPage;
