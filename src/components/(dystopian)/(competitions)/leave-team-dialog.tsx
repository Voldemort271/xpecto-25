import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import type { TeamWithFullDetails } from "@/app/types";

const LeaveTeamDialog = ({regTeam} : {regTeam: TeamWithFullDetails}) => {
  const { CurrentUser } = useCurrentUser();
  const removeUserFromTeamMutation = api.user.deleteUserFromTeam.useMutation();
  const handleUserTeamDelete = ({ teamId }: { teamId: string }) => {
    if (!CurrentUser) {
      return;
    }
    try {
      removeUserFromTeamMutation.mutate(
        {
          userId: CurrentUser.id,
          teamId: teamId,
        },
        {
          onSuccess: () => {
            alert("Left the team successfully");
            window.location.reload();
          },
        },
      );
    } catch (e) {
      console.error(e);
      alert("Failed to delete user. Please try again.");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-200">
          Want out of team?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Leave Team</DialogTitle>
        <div className="flex justify-start">
          <Button
            onClick={() => handleUserTeamDelete({ teamId: regTeam.id })}
            className="bg-red-500 hover:bg-red-200"
          >
            Yes I want out of Team
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveTeamDialog;
