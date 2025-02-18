import React, { useContext, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { User } from "@prisma/client";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import type { TeamWithFullDetails } from "@/app/types";
import { CursorContext } from "@/context/cursor-context";
import { Handjet, Share_Tech } from "next/font/google";
import MarqueeContainer from "@/components/common/marquee-container";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";

const handjet = Handjet({ subsets: ["latin"] });
const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const InviteTeammatesDialog = ({
  regTeam,
  compId,
}: {
  regTeam: TeamWithFullDetails | null | undefined;
  compId: string;
}) => {
  const { CurrentUser } = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [invitees, setInvitees] = useState<User[]>([]);
  const [sending, setSending] = useState(false);

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
      enabled: !!CurrentUser && !(compId === "") && debouncedQuery !== "",
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
    setSending(true);
    if (!CurrentUser) {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            User not logged in
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
      return;
    }

    sendTeamInvitesMutation.mutate(
      {
        teamId: regTeam?.id ?? "",
        invitees: invitees.map((user) => user.id),
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

  const { setIsHovered } = useContext(CursorContext);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="cursor-none bg-green-500 px-5 py-2 text-2xl font-normal uppercase"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          invite members
        </button>
      </DialogTrigger>
      <DialogContent
        className={`max-w-[800px] border-2 border-amber-50/[0.7] bg-neutral-900 p-0 text-amber-50 ${handjet.className} tracking-widest`}
      >
        <DialogTitle className="relative z-10 flex h-12 w-full cursor-none items-center overflow-clip border-b-2 border-amber-50/[0.7] bg-neutral-900 text-2xl font-normal uppercase tracking-wider text-amber-50">
          <MarqueeContainer
            text={[
              "invite more members",
              "invite more members",
              "invite more members",
            ]}
          />
        </DialogTitle>
        <div className="p-5 pt-0">
          {invitees.length > 0 && (
            <div className="flex flex-row flex-wrap gap-5">
              <div className="-mb-5 w-full pb-2 text-2xl font-normal uppercase">
                Invitees
              </div>
              {invitees.map((user) => {
                return (
                  <div
                    className={`flex w-80 flex-wrap bg-amber-50/[0.3] px-5 py-2 ${sharetech.className} cursor-pointer text-lg tracking-tight`}
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
            disabled={invitees.length === 0 || sending}
            className="bg-amber-50/[0.7] px-5 py-2 text-2xl font-normal uppercase text-neutral-900"
          >
            Send invitations
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteTeammatesDialog;
