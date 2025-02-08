"use client";

import WorkshopDetailsBox from "@/components/workshops/workshop-details-box";
import { api } from "@/trpc/react";
import React, { use } from "react";
import WorkshopsHeader from "@/components/workshops/workshops-header";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });

const Page = ({ params }: { params: Promise<{ work: string }> }) => {
  const compSlug = use(params).work;
  const { data: work, isLoading } = api.workshop.getWorkshopBySlug.useQuery({
    slug: compSlug,
  });

  return (
    <>
      <div
        className={`grid w-screen grid-rows-[64px_auto] overflow-clip bg-neutral-900 md:h-screen md:grid-cols-[64px_auto] md:grid-rows-1 ${handjet.className}`}
      >
        <div className="relative h-full w-full">
          <WorkshopsHeader />
        </div>
        <div className="relative h-full w-full bg-neutral-900">
          {isLoading && (
            <div className="loading flex h-screen w-screen flex-col justify-center bg-neutral-900"></div>
          )}
          {work && (
            <div className="flex w-screen flex-col items-center justify-center gap-12 xl:flex-row">
              <WorkshopDetailsBox work={work} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
