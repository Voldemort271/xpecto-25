"use client";

import CompetitionDetailsBox from "@/components/(dystopian)/(competition)/competition-details-box";
import CompTeamBox from "@/components/(dystopian)/(competition)/competition-team-box";

import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import { use } from "react";

const Page = ({ params }: { params: Promise<{ comp: string }> }) => {
  const { CurrentUser } = useCurrentUser();

  const compName = use(params).comp.replaceAll("%20", " ");
  const { data: comp } = api.competition.getCompByName.useQuery({
    name: compName,
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

  const regStatus = plan ? true : false;

  return (
    <>
      {comp && (
        <div className="container mx-auto flex gap-2 p-6">
          <CompetitionDetailsBox
            comp={comp}
            regStatus={regStatus}
            regTeam={regTeam}
          />
          {regStatus && <CompTeamBox regTeam={regTeam} comp={comp} />}
        </div>
      )}
    </>
  );
};

export default Page;
