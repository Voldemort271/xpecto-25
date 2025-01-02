import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useContext, useEffect, useState } from "react";
import { api } from "@/trpc/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { User } from "@prisma/client";
import { useCurrentUser } from "@/lib/utils";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { CursorContext } from "@/context/cursor-context";
import { Handjet, Share_Tech } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });
const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const CreateTeamDialog = ({ competitionId }: { competitionId: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [invitees, setInvitees] = useState<User[]>([]);
  const [teamName, setTeamName] = useState("");
  const { CurrentUser } = useCurrentUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults } = api.user.searchCompUsers.useQuery({
    query: debouncedQuery,
    invitees: CurrentUser
      ? [...invitees.map((user) => user.id), CurrentUser.id]
      : [],
    competitionId: competitionId,
  });

  const addUserToInvitees = (user: User) => {
    setInvitees([...invitees, user]);
  };
  const deleteUserFromInvitees = (userId: string) => {
    setInvitees(invitees.filter((u) => u.id !== userId));
  };

  const createTeamMutation = api.team.createTeam.useMutation();

  const { data: foundTeamName } = api.team.findTeamByNameComp.useQuery({
    name: teamName,
    competitionId: competitionId,
  });
  const { data: foundTeamUsers } = api.team.findTeamByUsers.useQuery({
    users: CurrentUser
      ? [...invitees.map((user) => user.id), CurrentUser.id]
      : [],
    competitionId: competitionId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!CurrentUser) {
      alert("User not logged in.");
      return;
    }

    if (foundTeamName) {
      console.log(foundTeamName);
      alert("Team with the same name already exists");
      return;
    }
    if (foundTeamUsers) {
      console.log(foundTeamUsers);
      alert("A team with the same set of Users already exists. Modify it");
      return;
    }

    createTeamMutation.mutate(
      {
        leaderId: CurrentUser.id,
        invitees: invitees.map((user) => user.id),
        name: teamName,
        compeitionId: competitionId,
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

  const { setIsHovered } = useContext(CursorContext);

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={`absolute bottom-[-2px] flex h-12 w-full cursor-none items-center overflow-clip border-y-2 border-amber-50 bg-amber-50/[0.7] text-2xl uppercase text-neutral-900 lg:w-[calc(100%-384px)]`}
          onMouseEnter={() => {
            if (CurrentUser?.email !== "") setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MarqueeContainer
            text={[
              "Create your team",
              "Create your team",
              "Create your team",
              "Create your team",
            ]}
            delay={-1}
          />
        </div>
      </DialogTrigger>
      <DialogContent
        className={`max-w-[800px] border-2 border-amber-50/[0.7] bg-neutral-900 p-0 text-amber-50 ${handjet.className} tracking-widest`}
      >
        <DialogHeader>
          <DialogTitle className="relative z-10 flex h-12 w-full cursor-none items-center overflow-clip border-b-2 border-amber-50/[0.7] bg-neutral-900 text-2xl font-normal uppercase tracking-wider text-amber-50">
            <MarqueeContainer
              text={[
                "Create your team",
                "Send invitations to team members",
                "Create your team",
                "Send invitations to team members",
              ]}
            />
          </DialogTitle>
        </DialogHeader>
        <div className="p-5">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {" "}
                Name{" "}
              </Label>
              <Input
                id="name"
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
              />
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
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={teamName === ""}
            className="bg-amber-50/[0.7] px-5 py-2 text-2xl font-normal uppercase text-neutral-900"
          >
            Send invitations
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
