"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import CompControl from "@/components/(dystopian)/(competitions)/competition-display-control";
import CompDisplayCard from "@/components/(dystopian)/(competitions)/competition-display-card";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const Page = () => {
  const { data: competitions, isLoading } =
    api.competition.getCompetitions.useQuery();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (competitions) {
      console.log("competition", competitions);
      console.log(competitions[0]?.competitionDetails);
    }
  }, [competitions]);

  return (
    <>
      <div className="grid h-full w-full grid-rows-[56px_auto] md:grid-cols-[64px_auto] md:grid-rows-1">
        <div className="h-full w-full">
          {!isLoading ? (
            <CompControl index={index} setIndex={setIndex} length={10} />
          ) : (
            <div className="relative flex h-full w-full">
              <div className="absolute left-0 top-0 hidden h-16 w-[100vh] -translate-x-[calc(50%-32px)] translate-y-[calc(50vh-32px)] -rotate-90 flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase md:flex">
                <MarqueeContainer
                  text={[
                    "loading page",
                    "we'll be right back",
                    "this doesn't take long",
                    "hang in there",
                  ]}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex h-full w-full flex-col justify-center">
          {!isLoading && competitions && competitions[0] ? (
            <CompDisplayCard
              title={competitions[0].competitionDetails.name}
              slug={competitions[0].competitionDetails.slug}
              begin_time={competitions[0].competitionDetails.begin_time}
              end_time={competitions[0].competitionDetails.end_time}
              img={`/event_covers/competitions/${competitions[0].competitionDetails.slug}.jpeg`}
            >
              <div className="hidden md:block lg:hidden">
                {competitions[0].competitionDetails.description.slice(0, 250)}
                ...
              </div>
              <div className="hidden lg:block xl:hidden">
                {competitions[0].competitionDetails.description.slice(0, 400)}
                ...
              </div>
              <div className="block md:hidden xl:block">
                {competitions[0].competitionDetails.description}
              </div>
            </CompDisplayCard>
          ) : (
            <div className="loading h-full w-full"></div>
          )}
        </div>
      </div>
    </>
  );
};
export default Page;
