"use client";
import React, { useState } from "react";
import { api } from "@/trpc/react";
import CompControl from "@/components/(dystopian)/competitions/competition-display-control";
import CompDisplayCard from "@/components/(dystopian)/competitions/competition-display-card";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const Page = () => {
  const { data: competitions, isLoading } =
    api.competition.getCompetitions.useQuery();
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="grid h-full w-full grid-rows-[56px_auto] md:grid-cols-[64px_auto] md:grid-rows-1">
        <div className="h-full w-full">
          {!isLoading && competitions ? (
            <CompControl
              index={index}
              setIndex={setIndex}
              length={competitions.length}
            />
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
          {/*TODO: Entry and exit animations on carousel shift*/}
          {!isLoading && competitions && competitions[index] ? (
            <CompDisplayCard
              title={competitions[index].competitionDetails.name}
              slug={competitions[index].competitionDetails.slug}
              begin_time={competitions[index].competitionDetails.begin_time}
              end_time={competitions[index].competitionDetails.end_time}
              img={`/event_covers/competitions/${competitions[index].competitionDetails.slug}.jpeg`}
            >
              <div className="hidden md:block lg:hidden">
                {competitions[index].competitionDetails.description.slice(
                  0,
                  250,
                )}
                ...
              </div>
              <div className="hidden lg:block xl:hidden">
                {competitions[index].competitionDetails.description.slice(
                  0,
                  400,
                )}
                ...
              </div>
              <div className="block md:hidden xl:block">
                {competitions[index].competitionDetails.description}
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
