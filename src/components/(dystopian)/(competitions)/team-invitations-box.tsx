import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import CustomToast from "@/components/custom-toast";

const InvitationBox = ({ compId }: { compId: string }) => {
  const { CurrentUser } = useCurrentUser();
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
      console.log(e);
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
      console.log(e);
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
    <div className="flex flex-col gap-2 text-lg font-bold">
      {myInvites?.map((invitee) => (
        <div
          className="flex w-full items-center justify-evenly"
          key={invitee.team.id}
        >
          <div className="flex p-2">{invitee.team.name}</div>
          <div className="flex gap-2">
            <Button
              className="bg-green-500 hover:bg-green-200"
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
              className="bg-red-500 hover:bg-red-200"
              onClick={() => handleRejectInvite({ token: invitee.token })}
            >
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvitationBox;
