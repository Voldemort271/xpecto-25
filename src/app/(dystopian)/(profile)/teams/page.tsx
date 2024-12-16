"use client";

import React from "react";
import { api } from "@/trpc/react"; // Import the api object
import { useCurrentUser } from "@/lib/utils";
import CreateTeamDialog from "@/app/_components/(dystopian)/create-team-dialog";
import { Button } from "@/components/ui/button"; // Import the Button component

const Page = () => {
  const { CurrentUser } = useCurrentUser();
  //TODO: Fix the call so that it fetches the teams dynamically, i.e., uses the team table directly. It is useless to do this cia user table
  const { data: myTeams } = api.post.getUserTeams.useQuery({
    userId: CurrentUser?.id ?? "",
  });
  //TODO: Fix the call so that it fetches the invites dynamically, i.e., uses the invitetoken table directly. It is useless to do this cia user table
  const { data: myInvitees } = api.post.getUserInvites.useQuery({
    userId: CurrentUser?.id ?? "",
  });

  const acceptInviteMutation = api.post.acceptTeamInvite.useMutation();
  const handleAcceptInvite = ({
    teamId,
    token,
  }: {
    teamId: string;
    token: string;
  }) => {
    if (!CurrentUser) {return}
    try {
      acceptInviteMutation.mutate({
        userId: CurrentUser.id,
        teamId: teamId,
        token: token,
      });
    } catch (e) {
      console.error(e);
      alert("Failed to accept the invitation. Please try again.");
    }
  };

  const rejectInviteMutation = api.post.deleteTeamInvite.useMutation();
  const handleRejectInvite = ({ token }: { token: string }) => {
    if (!CurrentUser) {return}
    try {
      rejectInviteMutation.mutate({ token: token });
    } catch (e) {
      console.error(e);
      alert("Failed to reject the invitation. Please try again.");
    }
  };

  const removeUserFromTeamMutation = api.post.deleteUserFromTeam.useMutation();
  const handleUserTeamDelete = ({
    teamId,
  }: {
    teamId: string;
  }) => {
    if (!CurrentUser) {return}
    try {
      removeUserFromTeamMutation.mutate({ userId: CurrentUser.id, teamId: teamId });
    } catch (e) {
      console.error(e);
      alert("Failed to delete user. Please try again.");
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 p-2">
      <div className="text-2xl underline">Current Teams : </div>
      <div className="flex w-full flex-col gap-2">
        {myTeams?.map((team) => (
          <div key={team.id} className="flex items-center justify-evenly">
            <div>{team.name}</div>
            <Button onClick={() => handleUserTeamDelete({teamId: team.id})} className="bg-red-200 hover:bg-red-500">
              Want out of team?
            </Button>
          </div>
        ))}
      </div>
      <div className="text-2xl underline">Invitations : </div>
      <div className="flex w-full flex-col items-start gap-2">
        {myInvitees?.map((invitee) => (
          <div
            className="flex w-full items-center justify-evenly"
            key={invitee.team.id}
          >
            <div className="flex p-2">{invitee.team.name}</div>
            <div className="flex gap-2">
              <Button
                className="bg-green-200 hover:bg-green-500"
                onClick={() =>
                  handleAcceptInvite({
                    teamId: invitee.teamId,
                    token: invitee.token,
                  })
                }
              >
                Accept
              </Button>
              <Button
                className="bg-red-200 hover:bg-red-500"
                onClick={() => handleRejectInvite({ token: invitee.token })}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
      <CreateTeamDialog />
    </div>
  );
};

export default Page;
