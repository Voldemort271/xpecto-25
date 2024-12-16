"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
// import { useRouter } from "next/compat/router";
import React from "react";

const Page = () => {
  const [accepted, setAccepted] = React.useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   const pushToTeams = async () => {
  //     if (router) await router.push("/teams");
  //   };
  //   if (accepted) {
  //     pushToTeams().catch(console.error);
  //   }
  // }, [accepted]);

  const { token } = useParams();
  if (typeof token !== "string") {
    return <div>Invalid token {token}</div>;
  }
  const createInviteMutation = api.post.acceptTeamInvite.useMutation();

  // Add user validation here, that user who checks button is same as the one who is logged into the website
  const [data] = api.post.searchInvite.useSuspenseQuery({ token });

  const handleAcceptInvite = async () => {
    try {
      createInviteMutation.mutate(
        { userId: data.userId, teamId: data.teamId, token: token },
        {
          onSuccess: () => {
            setAccepted(true);
            window.location.href = "/teams";
          },
        },
      );
    } catch (e) {
      console.error(e);
      alert("Failed to accept the invitation. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-lg p-5 font-sans text-gray-800">
      <h1 className="text-4xl text-green-600">Welcome!</h1>
      {accepted ? (
        <>
          <p className="mt-4">
            You have successfully accepted the invitation to join the team{" "}
            <strong>{data.team.name}</strong> for Xpecto25 hosted by IIT Mandi.
          </p>
          <Button
            className="mt-4 inline-block cursor-not-allowed rounded bg-gray-400 px-4 py-2 text-lg text-white"
            disabled
          >
            Invitation Accepted
          </Button>
        </>
      ) : (
        <>
          <p className="mt-4">
            You have been invited to join the team{" "}
            <strong>{data.team.name}</strong> for Xpecto25 hosted by IIT Mandi.
          </p>
          <p className="mt-4">
            Click the button below to accept the invitation and join the team:
          </p>
          <Button
            onClick={handleAcceptInvite}
            className="mt-4 inline-block rounded bg-green-600 px-4 py-2 text-lg text-white hover:bg-green-700"
          >
            Accept Invitation
          </Button>
        </>
      )}
      <p className="mt-4">
        If you did not expect this invitation, you can safely ignore this page.
      </p>
      <p className="mt-4">
        Best regards,
        <br />
        The Team <strong>{data.team.name}</strong>
      </p>
    </div>
  );
};

export default Page;
