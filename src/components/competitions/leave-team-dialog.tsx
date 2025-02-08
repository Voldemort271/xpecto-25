import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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

const LeaveTeamDialog = ({ regTeam }: { regTeam: TeamWithFullDetails }) => {
  const { setIsHovered } = useContext(CursorContext);

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
            // toast.success("Left the team successfully");
            toast.custom(
              (t) => (
                <CustomToast variant={"success"} metadata={t}>
                  Left the team successfully
                </CustomToast>
              ),
              {
                position: "top-center",
              },
            );
            window.location.reload();
          },
        },
      );
    } catch (e) {
      console.error(e);
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            Failed to delete user. Please try again.
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="cursor-none bg-red-500 px-5 py-2 text-2xl font-normal uppercase"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          leave team
        </button>
      </DialogTrigger>
      <DialogContent
        className={`max-w-[800px] border-2 border-amber-50/[0.7] bg-neutral-900 p-0 text-amber-50 ${handjet.className} tracking-widest`}
      >
        <DialogTitle className="relative z-10 flex h-12 w-full cursor-none items-center overflow-clip border-b-2 border-amber-50/[0.7] bg-neutral-900 text-2xl font-normal uppercase tracking-wider text-amber-50">
          <MarqueeContainer
            text={[
              "confirm choice",
              "leave team",
              "confirm choice",
              "leave team",
            ]}
          />
        </DialogTitle>
        <div
          className={`${sharetech.className} w-full p-5 text-lg tracking-tight`}
        >
          Are you sure? This action is irreversible, and you will leave this
          team with immediate effect.
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={() => handleUserTeamDelete({ teamId: regTeam.id })}
            className="bg-amber-50/[0.7] px-5 py-2 text-2xl font-normal uppercase text-neutral-900"
          >
            leave team
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveTeamDialog;
