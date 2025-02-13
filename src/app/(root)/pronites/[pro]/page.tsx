"use client";

import ProniteDetailsBox from "@/components/pronites/pronite-details-box";
import { api } from "@/trpc/react";
import React, { use } from "react";
import PronitesHeader from "@/components/pronites/pronites-header";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });

const Page = ({ params }: { params: Promise<{ pro: string }> }) => {
  const proSlug = use(params).pro;
  const { data: pro, isLoading } = api.pronite.getProniteBySlug.useQuery({
    slug: proSlug,
  });

  return (
    <>
      <div
        className={`grid w-screen grid-rows-[64px_auto] overflow-clip bg-neutral-900 md:h-screen md:grid-cols-[64px_auto] md:grid-rows-1 ${handjet.className}`}
      >
        <div className="relative h-full w-full">
          <PronitesHeader />
        </div>
        <div className="relative h-full w-full bg-neutral-900">
          {isLoading && (
            <div className="loading flex h-screen w-screen flex-col justify-center bg-neutral-900"></div>
          )}
          {pro && (
            <div className="flex w-screen flex-col items-center justify-center gap-12 xl:flex-row">
              <ProniteDetailsBox pronite={pro} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
