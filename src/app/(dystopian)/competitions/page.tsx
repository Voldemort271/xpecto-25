"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import CompControl from "@/components/(test)/competition-display-control";
import CompDisplayCard from "@/components/(test)/competition-display-card";

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
      {/* //TODO: Add a searchbar for competitions */}
      {/*<div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">*/}
      {/*  {competitions*/}
      {/*    ?.sort((a, b) =>*/}
      {/*      a.competitionDetails.begin_time > b.competitionDetails.begin_time*/}
      {/*        ? 1*/}
      {/*        : b.competitionDetails.begin_time >*/}
      {/*            a.competitionDetails.begin_time*/}
      {/*          ? -1*/}
      {/*          : 0,*/}
      {/*    )*/}
      {/*    .map((el, i) => (*/}
      {/*      <CompCard*/}
      {/*        key={i}*/}
      {/*        slug={el.competitionDetails.slug}*/}
      {/*        img={`/event_covers/competitions/${el.competitionDetails.slug}.jpeg`}*/}
      {/*        title={el.competitionDetails.name}*/}
      {/*        details={el.competitionDetails.begin_time.toLocaleString()}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*</div>*/}
      <div className="grid h-full w-full grid-rows-[56px_auto] md:grid-cols-[64px_auto] md:grid-rows-1">
        <div className="h-full w-full">
          <CompControl index={index} setIndex={setIndex} length={10} />
        </div>
        <div className="flex h-full w-full flex-col justify-center">
          {!isLoading && competitions && competitions[0] ? (
            <CompDisplayCard
              title={competitions[0].competitionDetails.name}
              slug={competitions[0].competitionDetails.slug}
              begin_time={competitions[0].competitionDetails.begin_time}
              end_time={competitions[0].competitionDetails.end_time}
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
