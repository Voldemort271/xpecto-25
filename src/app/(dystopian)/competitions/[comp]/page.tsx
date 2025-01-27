"use client";

import CompetitionDetailsBox from "@/components/(dystopian)/competitions/competition-details-box";
import { api } from "@/trpc/react";
import React, { use } from "react";

const Page = ({ params }: { params: Promise<{ comp: string }> }) => {
  const compSlug = use(params).comp;
  const { data: comp, isLoading } = api.competition.getCompBySlug.useQuery({
    slug: compSlug,
  });

  return (
    <>
      {isLoading && (
        <div className="loading flex h-screen w-screen flex-col justify-center bg-neutral-900"></div>
      )}
      {comp && (
        <div className="flex w-screen flex-col items-center justify-center gap-12 xl:flex-row">
          <CompetitionDetailsBox comp={comp} />
        </div>
      )}
    </>
  );
};

export default Page;
