"use client";

import React, { useState } from "react";
import TeamCarouselContainer from "@/components/team/team-carousel-container";
import TeamCarousel from "@/components/team/team-carousel";
import TeamDetailsContainer from "@/components/team/team-details-container";
import TeamDetailsView from "@/components/team/team-details-view";
import { api } from "@/trpc/react";
import Loader from "@/components/common/loader";

const TeamPage = () => {
  const [index, setIndex] = useState(0);

  const { data: teamData, isLoading } = api.member.getMembers.useQuery();

  {
    /**TODO: Need to make this page responsive. */
  }
  return isLoading ? (
    <Loader loadingText="Loading Squad ..." />
  ) : (
    teamData && (
      <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip overflow-x-scroll bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
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
