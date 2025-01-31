"use client";

import React, { useState } from "react";
import TeamCarouselContainer from "@/components/(dystopian)/team/team-carousel-container";
import TeamCarousel from "@/components/(dystopian)/team/team-carousel";
import MemberDetailsContainer from "@/components/(dystopian)/team/member-details-container";
import MemberDetails from "@/components/(dystopian)/team/member-details";
import { teamData } from "@/lib/team-data";

const TeamPage = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
      <TeamCarouselContainer data={teamData[index]}>
        <TeamCarousel data={teamData} index={index} setIndex={setIndex} />
      </TeamCarouselContainer>
      <MemberDetailsContainer index={index} setIndex={setIndex}>
        <MemberDetails data={teamData[index]} key={index} />
      </MemberDetailsContainer>
    </div>
  );
};

export default TeamPage;
