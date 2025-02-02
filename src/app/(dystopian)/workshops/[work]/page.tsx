"use client";

import WorkshopDetailsBox from "@/components/(dystopian)/workshops/workshop-details-box";
import { api } from "@/trpc/react";
import React, { use } from "react";


const Page = ({ params }: { params: Promise<{ work: string }> }) => {
  const compSlug = use(params).work;
  const { data: work, isLoading } = api.workshop.getWorkshopBySlug.useQuery({
    slug: compSlug,
  });

  return (
    <>
      {isLoading && (
        <div className="loading flex h-screen w-screen flex-col justify-center bg-neutral-900"></div>
      )}
      {work && (
        <div className="flex w-screen flex-col items-center justify-center gap-12 xl:flex-row">
          <WorkshopDetailsBox work={work} />
        </div>
      )}
    </>
  );
};

export default Page;
