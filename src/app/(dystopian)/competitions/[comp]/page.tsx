"use client";

import CompetitionDetailsBox from "@/components/(dystopian)/competitions/competition-details-box";

import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import React, { use } from "react";

const Page = ({ params }: { params: Promise<{ comp: string }> }) => {
  const { CurrentUser } = useCurrentUser();

  const compSlug = use(params).comp;
  const { data: comp, isLoading: isCompLoading } =
    api.competition.getCompBySlug.useQuery({
      slug: compSlug,
    });
  const { data: plan, isLoading: isRegistrationLoading } =
    api.event.checkUserRegisteration.useQuery(
      {
        userId: CurrentUser?.id ?? "",
        eventId: comp?.competitionDetailsId ?? "",
      },
      {
        enabled: !!CurrentUser && !!comp,
      },
    );
  const { data: regTeam, isLoading: isTeamLoading } =
    api.team.findTeamOfUser.useQuery(
      {
        userId: CurrentUser?.id ?? "",
        competitionId: comp?.id ?? "",
      },
      {
        enabled: !!CurrentUser && !!comp,
      },
    );

  const regStatus = !!plan;

  return (
    <>
      {(isCompLoading || isRegistrationLoading || isTeamLoading) && (
        <div className="loading flex h-screen w-screen flex-col justify-center bg-neutral-900"></div>
      )}
      {comp && (
        <div className="flex w-screen flex-col items-center justify-center gap-12 xl:flex-row">
          <CompetitionDetailsBox
            comp={comp}
            regStatus={regStatus}
            regTeam={regTeam}
          />
        </div>
      )}
    </>
  );
};

export default Page;
