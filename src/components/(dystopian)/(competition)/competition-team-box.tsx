import { useCurrentUser } from "@/lib/utils";
import React from "react";
import LeaveTeamDialog from "./leave-team-dialog";
import type { CompetitionWithDetails, TeamWithFullDetails } from "@/app/types";
import InviteTeammatesDialog from "./invite-teammates-dialog";
import TeammateBox from "./teammate-box";
import InvitationBox from "./team-invitations-box";

const CompTeamBox = ({
  regTeam,
  comp,
}: {
  regTeam: TeamWithFullDetails | null | undefined;
  comp: CompetitionWithDetails;
}) => {
  const { CurrentUser } = useCurrentUser();

  return (
    <div className="w-[60%] rounded-lg bg-amber-50 p-6 text-neutral-900 shadow-md">
      {regTeam ? (
        <div className="flex h-full flex-col justify-between">
          <TeammateBox regTeam={regTeam} />
          <div className="flex justify-around">
            <LeaveTeamDialog regTeam={regTeam} />
            {CurrentUser?.id === regTeam.leaderId && <InviteTeammatesDialog regTeam={regTeam} compId={comp?.id ?? ""} />}
          </div>
        </div>
      ) : (
        <InvitationBox compId={comp?.id ?? ""} />
      )}
    </div>
  );
};

export default CompTeamBox;
