"use client";

import ExpoDetailsBox from "@/components/expos/expo-details-box";
import { api } from "@/trpc/react";
import React, { use } from "react";
import ExposHeader from "@/components/expos/expos-header";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });

const Page = ({ params }: { params: Promise<{ expo: string }> }) => {
  const expoSlug = use(params).expo;
  const { data: expo, isLoading } = api.expo.getExpoBySlug.useQuery({
    slug: expoSlug,
  });

  return (
    <>
      <div
        className={`grid w-screen grid-rows-[64px_auto] overflow-clip bg-neutral-900 md:h-screen md:grid-cols-[64px_auto] md:grid-rows-1 ${handjet.className}`}
      >
        <div className="relative h-full w-full">
          <ExposHeader />
        </div>
        <div className="relative h-full w-full bg-neutral-900">
          {isLoading && (
            <div className="loading flex h-screen w-screen flex-col justify-center bg-neutral-900"></div>
          )}
          {expo && (
            <div className="flex w-screen flex-col items-center justify-center gap-12 xl:flex-row">
              <ExpoDetailsBox expo={expo} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
