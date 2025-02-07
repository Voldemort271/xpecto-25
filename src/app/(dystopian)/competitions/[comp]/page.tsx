"use client";

import CompetitionDetailsBox from "@/components/(dystopian)/competitions/competition-details-box";
import { api } from "@/trpc/react";
import React, { use } from "react";
import CompetitionsHeader from "@/components/(dystopian)/competitions/competitions-header";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });

const Page = ({ params }: { params: Promise<{ comp: string }> }) => {
  const compSlug = use(params).comp;
  const { data: comp, isLoading } = api.competition.getCompBySlug.useQuery({
    slug: compSlug,
  });

  return (
    <>
      <div
        className={`grid w-screen grid-rows-[64px_auto] overflow-clip bg-neutral-900 md:h-screen md:grid-cols-[64px_auto] md:grid-rows-1 ${handjet.className}`}
      >
        <div className="relative h-full w-full">
          <CompetitionsHeader />
        </div>
        <div className="relative h-full w-full bg-neutral-900">
          {isLoading && (
            <div className="loading flex h-screen w-screen flex-col justify-center bg-neutral-900"></div>
          )}
          {comp && (
            <div className="flex w-screen flex-col items-center justify-center gap-12 xl:flex-row">
              <CompetitionDetailsBox comp={comp} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
