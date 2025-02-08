"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import CompetitionsCarouselContainer from "@/components/competitions/competitions-carousel-container";
import CompetitionsCarousel from "@/components/competitions/competitions-carousel";
import CompetitionDetailsContainer from "@/components/competitions/competition-details-container";
import CompetitionDetailsView from "@/components/competitions/competition-details-view";

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
      {isLoading || !competitions || !competitions[index] ? (
        <div className="h-full w-full bg-neutral-900"></div>
      ) : (
        <CompetitionDetailsContainer
          data={competitions}
          index={index}
          setIndex={setIndex}
        >
          <CompetitionDetailsView data={competitions[index]} key={index} />
        </CompetitionDetailsContainer>
      )}
    </div>
  );
};

export default TeamPage;
