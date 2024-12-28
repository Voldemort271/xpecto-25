import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { User } from "@prisma/client";
import { useCurrentUser } from "@/lib/utils";

const CreateTeamDialog = ({ competitionId }: { competitionId: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [invitees, setInvitees] = useState<User[]>([]);
  const [teamName, setTeamName] = useState("");
  const {CurrentUser} = useCurrentUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults } = api.user.searchCompUsers.useQuery({
    query: debouncedQuery,
    invitees: CurrentUser ? [...invitees.map((user) => user.id), CurrentUser.id] : [],
    competitionId: competitionId,
  });

  const addUserToInvitees = (user: User) => {
    setInvitees([...invitees, user]);
  };
  const deleteUserFromInvitees = (userId: string) => {
    setInvitees(invitees.filter((u) => u.id !== userId));
  };

  const createTeamMutation = api.team.createTeam.useMutation();

  const {data: foundTeamName} = api.team.findTeamByNameComp.useQuery({
    name: teamName,
    competitionId: competitionId,
  });
  const {data: foundTeamUsers} = api.team.findTeamByUsers.useQuery({
    users: CurrentUser ? [...invitees.map((user) => user.id), CurrentUser.id] : [],
    competitionId: competitionId,
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!CurrentUser) {
      alert("User not logged in.");
      return;
    }

    if (foundTeamName){
      console.log(foundTeamName);
      alert("Team with the same name already exists");
      return
    }
    if (foundTeamUsers){
      console.log(foundTeamUsers);
      alert("A team with the same set of Users already exists. Modify it");
      return
    }
    
    createTeamMutation.mutate({
      leaderId: CurrentUser.id,
      invitees: invitees.map((user) => user.id),
      name: teamName,
      compeitionId: competitionId,
    }, {
      onSuccess: () => {
        alert("Invitations Sent Successfully");
        window.location.reload();
      },
      onError: () => {
        alert("Failed to send invitations. Please try again.");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600">Create your team</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Team</DialogTitle>
          <DialogDescription>
            Send invitations to team members and start competing
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right"> Name </Label>
            <Input id="name" onChange={(e) => setTeamName(e.target.value)} placeholder="Enter team name" />
            </div>
            {/* //TODO: Idk, maybe something can go here ig */}
          </div>
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
          <Button type="submit" onClick={handleSubmit} disabled={teamName === ""}>
            Send Invitations
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
