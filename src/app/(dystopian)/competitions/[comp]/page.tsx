"use client";

import CompetitionDetailsBox from "@/components/(dystopian)/competitions/competition-details-box";

import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import React, { use } from "react";

const Page = ({ params }: { params: Promise<{ comp: string }> }) => {
  const { CurrentUser } = useCurrentUser();

  const compSlug = use(params).comp;
  const { data: comp } = api.competition.getCompBySlug.useQuery({
    slug: compSlug,
  });
  const { data: plan } = api.event.checkUserRegisteration.useQuery(
    {
      userId: CurrentUser?.id ?? "",
      eventId: comp?.competitionDetailsId ?? "",
    },
    {
      enabled: !!CurrentUser && !!comp,
    },
  );
  const { data: regTeam } = api.team.findTeamOfUser.useQuery(
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
