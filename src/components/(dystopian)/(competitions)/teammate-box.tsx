import type { TeamWithFullDetails } from "@/app/types";
import { useCurrentUser } from "@/lib/utils";
import React from "react";

const TeammateBox = ({regTeam} : {regTeam: TeamWithFullDetails}) => {
    const { CurrentUser } = useCurrentUser();
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-bold underline">{regTeam.name}</div>
      <div className="text-md font-bold">Team members:</div>
      <div>
        {regTeam.team_members.map((member) => (
          <div
            key={member.email}
            className="flex flex-col rounded-lg border-2 bg-neutral-900 p-2 text-amber-50"
          >
            <div className="flex gap-2">
              {member.name}
              {member.email === CurrentUser?.email && (
                <div>{"(You)"}</div> //TODO: Make this a badge, green preferably
              )}
              {member.id === regTeam.leaderId && (
                <div>{"(Leader)"}</div> //TODO: Make this a badge, red or something like a star preferably
              )}
            </div>
            <div className="flex text-sm">
              <div className="font-normal italic">{member.college_name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeammateBox;
