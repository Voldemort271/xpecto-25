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
import MarqueeContainer from "@/components/common/marquee-container";
import { CursorContext } from "@/context/cursor-context";
import { Handjet, Share_Tech } from "next/font/google";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";

const handjet = Handjet({ subsets: ["latin"] });
const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const CreateTeamDialog = ({ competitionId }: { competitionId: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [invitees, setInvitees] = useState<User[]>([]);
  const [teamName, setTeamName] = useState("");
  const { CurrentUser } = useCurrentUser();
  const { setIsHovered } = useContext(CursorContext);

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
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            User not logged in.
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
      return;
    }

    if (foundTeamName) {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            Team with the same name already exists!!
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
      return;
    }
    if (foundTeamUsers) {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            A team with the same set of Users already exists. Modify it!!
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
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
          toast.custom(
            (t) => (
              <CustomToast variant={"success"} metadata={t}>
                Invitations Sent Successfully
              </CustomToast>
            ),
            {
              position: "top-center",
            },
          );
          window.location.reload();
        },
        onError: () => {
          toast.custom(
            (t) => (
              <CustomToast variant={"error"} metadata={t}>
                Failed to send invitations. Please try again.
              </CustomToast>
            ),
            {
              position: "top-center",
            },
          );
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={`absolute bottom-0 flex h-12 w-full cursor-none items-center overflow-clip border-2 border-amber-50 bg-amber-50/[0.7] text-2xl uppercase text-neutral-900 md:border-l-0`}
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
            <div className="flex w-full items-center gap-5">
              <Label htmlFor="name" className="text-2xl font-normal uppercase">
                Name
              </Label>
              <Input
                className={`rounded-none border-2 border-amber-50 text-lg text-amber-50 ${sharetech.className} tracking-tight`}
                id="name"
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
              />
            </div>
            {/* //TODO: Idk, maybe something can go here ig */}
          </div>
          {invitees.length > 0 && (
            <div className="flex flex-row flex-wrap gap-5">
              <div className="-mb-5 w-full pb-2 pt-5 text-2xl font-normal uppercase">
                Invitees
              </div>
              {invitees.map((user) => {
                return (
                  <div
                    className={`flex max-w-80 flex-col flex-wrap bg-amber-50/[0.3] px-5 py-2 ${sharetech.className} cursor-pointer text-lg tracking-tight`}
                    key={user.id}
                    onClick={() => deleteUserFromInvitees(user.id)}
                  >
                    <div className="">{user.name}</div>
                    <div className="text-base">{user.email}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-5 flex flex-col gap-2">
            <Label
              htmlFor="username"
              className="text-2xl font-normal uppercase"
            >
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
                    className={`rounded-none border-2 border-amber-50 text-lg text-amber-50 ${sharetech.className} tracking-tight`}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className={`${sharetech.className} w-full rounded-none border-2 border-amber-50/[0.5] bg-neutral-900 text-lg tracking-tight text-amber-50`}
              >
                {searchResults?.map((user) => (
                  <div
                    className="flex w-full min-w-80 cursor-pointer flex-col border-y-2 border-amber-50/[0.5] p-2"
                    key={user.id}
                    onClick={() => addUserToInvitees(user)}
                  >
                    <div className="text-base">{user.name}</div>
                    <div className="text-sm">{user.email}</div>
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
