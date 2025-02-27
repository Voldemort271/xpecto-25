import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import { CursorContext } from "@/context/cursor-context";
import { Handjet, Share_Tech } from "next/font/google";
import MarqueeContainer from "@/components/common/marquee-container";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import type { CompetitionWithDetails, TeamWithFullDetails } from "@/app/types";

const handjet = Handjet({ subsets: ["latin"] });
const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const FinalizeTeamDialog = ({ regTeam, comp}: { regTeam: TeamWithFullDetails, comp: CompetitionWithDetails }) => {
  const [finalizing, setFinalizing] = useState(false);
  const { setIsHovered } = useContext(CursorContext);

  const { CurrentUser } = useCurrentUser();
  const finalizeTeamMutation = api.team.finalizeTeam.useMutation();
  const handleFinalizeTeam = ({
    teamId,
    minSize,
    maxSize,
    currentSize,
  }: {
    teamId: string;
    minSize: number;
    maxSize: number;
    currentSize: number;
  }) => {
    setFinalizing(true);
    if (!CurrentUser) {
      return;
    }
    try {
      finalizeTeamMutation.mutate(
        {
          teamId,
          minSize,
          maxSize,
          currentSize,
        },
        {
          onSuccess: () => {
            toast.custom(
              (t) => (
                <CustomToast variant={"success"} metadata={t}>
                  Team finalized successfully.
                </CustomToast>
              ),
              {
                duration: 5000,
                position: "top-center",
              },
            );
            window.location.reload();
          },
          onError: (error) => {
            console.error(error);
            toast.custom(
              (t) => (
                <CustomToast variant={"error"} metadata={t}>
                  {error.message}
                </CustomToast>
              ),
              {
                duration: 5000,
                position: "top-center",
              },
            );
          },
        },
      );
    } catch (e) {
      console.error(e);
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            Some error occurred. Please try again later.
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
          className="cursor-none bg-blue-500 px-5 py-2 text-2xl font-normal uppercase"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          finalize
        </button>
      </DialogTrigger>
      <DialogContent
        className={`max-w-[800px] border-2 border-amber-50/[0.7] bg-neutral-900 p-0 text-amber-50 ${handjet.className} tracking-widest`}
      >
        <DialogTitle className="relative z-10 flex h-12 w-full cursor-none items-center overflow-clip border-b-2 border-amber-50/[0.7] bg-neutral-900 text-2xl font-normal uppercase tracking-wider text-amber-50">
          <MarqueeContainer
            text={[
              "confirm choice",
              "finalize team",
              "confirm choice",
              "finalize team",
            ]}
          />
        </DialogTitle>
        <div
          className={`${sharetech.className} w-full p-5 text-lg tracking-tight`}
        >
          Are you sure? This action is irreversible, and your team will be
          finalized.
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={() =>{
              handleFinalizeTeam({
                teamId: regTeam.id,
                minSize: comp.min_team_size ?? 1,
                maxSize: comp.max_team_size ?? 5,
                currentSize: regTeam.team_members.length,
              })}
            }
            disabled={finalizing}
            className="bg-amber-50/[0.7] px-5 py-2 text-2xl font-normal uppercase text-neutral-900"
          >
            finalize team
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinalizeTeamDialog;
