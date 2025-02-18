import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import { CursorContext } from "@/context/cursor-context";

const InvitationBox = ({ compId }: { compId: string }) => {
  const { CurrentUser } = useCurrentUser();
  const { setIsHovered } = useContext(CursorContext);
  const { data: userInvites } = api.invite.getUserInvites.useQuery(
    {
      userId: CurrentUser?.id ?? "",
      comptitionId: compId,
    },
    {
      enabled: !!CurrentUser && !(compId === ""),
    },
  );

  // States for dynamic data
  const [myInvites, setMyInvites] = useState<typeof userInvites>([]);

  // Update states whenever data is fetched since useQuery works automatically for refetching
  useEffect(() => {
    if (userInvites) {
      setMyInvites(userInvites);
    }
  }, [userInvites]);

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
            if (myInvites && e) {
              setMyInvites(
                myInvites.filter((invite) => invite.token !== token),
              );
              window.location.reload();
            } else {
              if (!e) {
                toast.custom(
                  (t) => (
                    <CustomToast variant="success" metadata={t}>
                      Team has been deleted.
                    </CustomToast>
                  ),
                  {
                    position: "top-center",
                  },
                );
              }
              setMyInvites([]);
            }
          },
        },
      );
    } catch (e) {
      toast.custom(
        (t) => (
          <CustomToast variant="error" metadata={t}>
            Failed to accept the invitation. Please try again.
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
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
      toast.custom(
        (t) => (
          <CustomToast variant="error" metadata={t}>
            Failed to reject the invitation. Please try again.
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
    }
  };

  return (
    <div className="flex flex-col gap-2.5 p-5 text-lg font-bold">
      {myInvites?.map((invitee) => (
        <div
          key={invitee.team.id}
          className="flex flex-col bg-amber-50/[0.3] px-5 py-2.5 text-amber-50"
        >
          <div className="mb-2.5 flex flex-wrap justify-between gap-5 text-2xl font-normal uppercase sm:mb-0">
            {invitee.team.name}

            <div className="flex flex-wrap gap-2">
              <Button
                className="cursor-none rounded-none bg-green-500 px-5 py-2 text-xl font-normal uppercase"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
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
                className="cursor-none rounded-none bg-red-500 px-5 py-2 text-xl font-normal uppercase"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => handleRejectInvite({ token: invitee.token })}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvitationBox;
