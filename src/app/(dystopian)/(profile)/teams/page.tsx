"use client";

import React, { useEffect } from "react";
import { api } from "@/trpc/react"; // Import the api object
import { useCurrentUser } from "@/lib/utils";
import CreateTeamDialog from "@/components/(dystopian)/create-team-dialog";
import { Button } from "@/components/ui/button"; // Import the Button component

const Page = () => {
  const { CurrentUser } = useCurrentUser();

  // Use Query in start so that we can use its type later and it is in top heiarchy, This is really IMP lol.
  const { data: userTeams } = api.user.getUserTeams.useQuery({
    userId: CurrentUser?.id ?? "",
  });
  const { data: userInvites } = api.user.getUserInvites.useQuery({
    userId: CurrentUser?.id ?? "",
  });

  // States for dynamic data
  const [myTeams, setMyTeams] = React.useState<typeof userTeams>([]);
  const [myInvites, setMyInvites] = React.useState<typeof userInvites>([]);

  // Update states whenever data is fetched since useQuery works automatically for refetching
  useEffect(() => {
    if (userTeams) {
      setMyTeams(userTeams);
    }
  }, [userTeams]);

  useEffect(() => {
    if (userInvites) {
      setMyInvites(userInvites);
    }
  }, [userInvites]);

  // Mutations
  const acceptInviteMutation = api.invite.acceptTeamInvite.useMutation();
  const handleAcceptInvite = ({
    teamId,
    token,
  }: {
    teamId: string;
    token: string;
  }) => {
    if (!CurrentUser) {
      return;
    }
    try {
      acceptInviteMutation.mutate(
        {
          userId: CurrentUser.id,
          teamId: teamId,
          token: token,
        },
        {
          onSuccess: (e) => {
            if (myInvites) {
              setMyInvites(
                myInvites.filter((invite) => invite.token !== token),
              );
            } else {
              setMyInvites([]);
            }
            if (myTeams) {
              setMyTeams([...myTeams, e]);
            } else {
              setMyTeams([e]);
            }
          },
        },
      );
    } catch (e) {
      console.error(e);
      alert("Failed to accept the invitation. Please try again.");
    }
  };

  const rejectInviteMutation = api.invite.deleteTeamInvite.useMutation();
  const handleRejectInvite = ({ token }: { token: string }) => {
    if (!CurrentUser) {
      return;
    }
    try {
      rejectInviteMutation.mutate(
        { token: token },
        {
          onSuccess: () => {
            if (myInvites) {
              setMyInvites(
                myInvites.filter((invite) => invite.token !== token),
              );
            } else {
              setMyInvites([]);
            }
          },
        },
      );
    } catch (e) {
      console.error(e);
      alert("Failed to reject the invitation. Please try again.");
    }
  };

  const removeUserFromTeamMutation = api.user.deleteUserFromTeam.useMutation();
  const handleUserTeamDelete = ({ teamId }: { teamId: string }) => {
    if (!CurrentUser) {
      return;
    }
    try {
      removeUserFromTeamMutation.mutate(
        { userId: CurrentUser.id, teamId: teamId },
        {
          onSuccess: () => {
            setMyTeams((oldTeams) =>
              oldTeams?.filter((team) => team.id !== teamId),
            );
          },
        },
      );
    } catch (e) {
      console.error(e);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 p-2">
      <div className="text-2xl underline">Current Teams :</div>
      <div className="flex w-full flex-col gap-2">
        {myTeams?.map((team) => (
          <div key={team.id} className="flex items-center justify-evenly">
            <div>{team.name}</div>
            <Button
              onClick={() => handleUserTeamDelete({ teamId: team.id })}
              className="bg-red-200 hover:bg-red-500"
            >
              Want out of team?
            </Button>
          </div>
        ))}
      </div>
      <div className="text-2xl underline">Invitations :</div>
      <div className="flex w-full flex-col items-start gap-2">
        {myInvites?.map((invitee) => (
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
