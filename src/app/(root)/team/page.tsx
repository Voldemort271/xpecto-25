"use client";

import React, { useState } from "react";
import TeamCarouselContainer from "@/components/team/team-carousel-container";
import TeamCarousel from "@/components/team/team-carousel";
import TeamDetailsContainer from "@/components/team/team-details-container";
import TeamDetailsView from "@/components/team/team-details-view";
import { api } from "@/trpc/react";
import MarqueeContainer from "@/components/common/marquee-container";

const TeamPage = () => {
  const [index, setIndex] = useState(0);

  const { data: teamData, isLoading } = api.member.getMembers.useQuery();

  //TODO: Loaders needed all over the code everywhere required wherever useQuery or useMutation were used. Super annoying.

  return isLoading ? (
    <div className="loading relative z-0 h-screen w-screen bg-neutral-900">
      <div className="absolute left-1/2 top-1/2 flex h-16 w-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-4xl font-normal uppercase text-amber-50">
        <MarqueeContainer
          text={[
            "Loading",
            "hang in there",
            "loading squad",
            "hang in there",
            "Loading",
            "hang in there",
            "loading squad",
            "hang in there",
            "Loading",
            "hang in there",
            "loading squad",
            "hang in there",
          ]}
        />
      </div>
    </div>
  ) : (
    teamData && (
      <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
        <TeamCarouselContainer data={teamData[index]}>
          <TeamCarousel data={teamData} index={index} setIndex={setIndex} />
        </TeamCarouselContainer>
        <TeamDetailsContainer index={index} setIndex={setIndex}>
          <TeamDetailsView data={teamData[index]} key={index} />
        </TeamDetailsContainer>
      </div>
    )
  );
};

export default TeamPage;
