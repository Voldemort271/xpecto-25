"use client";

import React from "react";
import { api } from "@/trpc/react";
import SponsorTitle from "@/components/(dystopian)/sponsors/sponsor-title";
import TitleSponsor from "@/components/(dystopian)/sponsors/title-sponsor";

const Page = () => {
  const allSpons = api.sponsor.getSponsor.useQuery({ id: "" }).data; // id="" fetches all spons

  return (
    <div className="w-full bg-neutral-900">
      <SponsorTitle />
      <div className="flex w-full flex-col gap-12 bg-neutral-900 p-5 pt-24 sm:p-12 md:p-24">
        <TitleSponsor />
      </div>
    </div>
  );
};

export default Page;
