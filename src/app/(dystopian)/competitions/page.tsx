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
          <CompDisplayCard />
        </div>
      </div>
    </>
  );
};
export default Page;
