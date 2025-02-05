"use client";

import React, { useState } from "react";
import TeamDetailsContainer from "@/components/(dystopian)/team/team-details-container";
import TeamDetailsView from "@/components/(dystopian)/team/team-details-view";
import { teamData } from "@/lib/team-data";
import { api } from "@/trpc/react";
import CompetitionsCarouselContainer from "@/components/(dystopian)/(test)/competitions-carousel-container";
import CompetitionsCarousel from "@/components/(dystopian)/(test)/competitions-carousel";

const TeamPage = () => {
  const { data: competitions, isLoading } =
    api.competition.getCompetitions.useQuery();

  const [index, setIndex] = useState(0);

  return (
    <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
      {isLoading || !competitions || !competitions[index] ? (
        <div className="loading h-full w-full border-2 border-amber-50 bg-neutral-900"></div>
      ) : (
        <CompetitionsCarouselContainer data={competitions[index]}>
          <CompetitionsCarousel
            data={competitions}
            index={index}
            setIndex={setIndex}
          />
        </CompetitionsCarouselContainer>
      )}
      <TeamDetailsContainer index={index} setIndex={setIndex}>
        <TeamDetailsView data={teamData[index]} key={index} />
      </TeamDetailsContainer>
    </div>
  );
};

export default TeamPage;
