"use client";

import React, { Suspense } from "react";
import { api } from "@/trpc/react"; // Import the api object
import { useCurrentUser } from "@/lib/utils";
import CreateTeamDialog from "@/app/_components/(dystopian)/create-team-dialog";
import Link from "next/link";

const Page = () => {

  const { CurrentUser } = useCurrentUser();
  
    const { data: myTeams } = api.post.getUserTeams.useQuery({
      userId: CurrentUser?.id ?? "",
    });
    const { data: myInvitees } = api.post.getUserInvites.useQuery({
      userId: CurrentUser?.id ?? "",
    })

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 p-2">
      <div className="text-2xl underline">Current Teams : </div>
      <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col">
      {myTeams?.map((team) => (
        <div key={team.id}>{team.name}</div>
      ))}
    </div>
      </Suspense>
      <div className="text-2xl underline">Invitations : </div>
      <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col">
      {myInvitees?.map((invitee) => (
        <Link href={`/invite/${invitee.token}`} key={invitee.team.id}><div>{invitee.team.name}</div></Link>
      ))}
    </div>
      </Suspense>
      <CreateTeamDialog />
    </div>
  );
};

export default Page;
