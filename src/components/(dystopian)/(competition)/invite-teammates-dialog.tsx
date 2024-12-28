import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../ui/button";
import type { User } from "@prisma/client";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import type { TeamWithFullDetails } from "@/app/types";

const InviteTeammatesDialog = ({regTeam, compId} : {regTeam: TeamWithFullDetails | null | undefined, compId: string}) => {
    const { CurrentUser } = useCurrentUser();
    const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [invitees, setInvitees] = useState<User[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults } = api.user.searchCompUsers.useQuery(
    {
      query: debouncedQuery,
      invitees: CurrentUser
        ? [
            ...invitees.map((user) => user.id),
            CurrentUser.id,
            ...(regTeam?.team_members?.map((user) => user.id) ?? []),
          ]
        : [],
      competitionId: compId,
    },
    {
      enabled: !!CurrentUser && !(compId==="") && debouncedQuery !== "",
    },
  );

  const addUserToInvitees = (user: User) => {
    setInvitees([...invitees, user]);
  };
  const deleteUserFromInvitees = (userId: string) => {
    setInvitees(invitees.filter((u) => u.id !== userId));
  };

  const sendTeamInvitesMutation = api.team.sendTeamInvites.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!CurrentUser) {
      alert("User not logged in.");
      return;
    }

    sendTeamInvitesMutation.mutate(
      {
        teamId: regTeam?.id ?? "",
        invitees: invitees.map((user) => user.id),
      },
      {
        onSuccess: () => {
          alert("Invitations Sent Successfully");
          window.location.reload();
        },
        onError: () => {
          alert("Failed to send invitations. Please try again.");
        },
      },
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-200">
          Invite Peeps
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Invite More</DialogTitle>
        <DialogDescription>Send invitations to team members</DialogDescription>
        <div className="grid gap-2 py-4">
          {invitees.length > 0 && (
            <div className="flex flex-col">
              <div className="p-2 font-extrabold">Invitees</div>
              {invitees.map((user) => {
                return (
                  <div
                    className="flex w-80 flex-col border-b-2 border-t-2 p-2"
                    key={user.id}
                    onClick={() => deleteUserFromInvitees(user.id)}
                  >
                    <div className="">{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-8 flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Enter user emails to send invitations
            </Label>
            <Popover
              open={
                searchQuery !== "" && searchResults && searchResults.length > 0
              }
            >
              <PopoverTrigger asChild>
                <div className="w-full">
                  <Input
                    id="username"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for users through email"
                    className="w-full border-2"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="w-full"
              >
                {searchResults?.map((user) => (
                  <div
                    className="flex w-80 flex-col border-b-2 border-t-2 p-2"
                    key={user.id}
                    onClick={() => addUserToInvitees(user)}
                  >
                    <div className="">{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={invitees.length === 0}
          >
            Send Invitations
          </Button>
        </DialogFooter>{" "}
      </DialogContent>
    </Dialog>
  );
};

export default InviteTeammatesDialog;
