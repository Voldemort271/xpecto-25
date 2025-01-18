import type { TeamWithFullDetails } from "@/app/types";
import { useCurrentUser } from "@/lib/utils";
import React from "react";

const TeammateBox = ({ regTeam }: { regTeam: TeamWithFullDetails }) => {
  const { CurrentUser } = useCurrentUser();
  return (
    <div className="flex flex-col gap-2.5 p-5">
      {regTeam.team_members.map((member) => (
        <div
          key={member.id}
          className="flex flex-col bg-amber-50/[0.3] px-5 py-2.5 text-amber-50"
        >
          <div className="mb-2.5 flex flex-col text-2xl font-normal uppercase sm:mb-0 sm:flex-row sm:items-center sm:gap-2">
            {member.name}
            <div className="flex gap-2.5">
              {member.email === CurrentUser?.email && (
                <div className="rounded-full bg-green-500 px-2.5 py-0.5 text-base font-normal uppercase">
                  you
                </div>
              )}
              {member.id === regTeam.leaderId && (
                <div className="rounded-full bg-amber-500 px-2.5 py-0.5 text-base font-normal uppercase">
                  leader
                </div>
              )}
            </div>
          </div>
          <div className="flex text-base uppercase text-neutral-400">
            {member.college_name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeammateBox;
