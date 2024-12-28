"use client";
import React, { useEffect } from "react";
import { api } from "@/trpc/react"; // Import the api object
import Link from "next/link";


const Page = () => {
  const { data: competitions } = api.competition.getCompetitions.useQuery();

  useEffect(() => {
    if (competitions) {
      console.log("competition", competitions);
    }
  }, [competitions]);


  return (
    <>
    {/* //TODO: Add a searchbar for competitions */}
      <div className="flex flex-col justify-center items-center gap-5">
        {competitions?.map((comp) => {
          return (
            <Link href={`/competitions/${comp.competitionDetails.name}`} key={comp.id} className="flex gap-2 items-center border-2 p-2 rounded-lg bg-amber-50 text-neutral-900">
              <div
                style={{ backgroundImage: `url(/event_covers/competitions/${comp.competitionDetails.name.replace(' ', '%20')}.jpeg), url(logo.enc)` }}
                className="flex h-28 w-28 items-center justify-center bg-cover bg-no-repeat rounded-full"
              >
              </div>
              <div className="bg-amber-50 w-1 h-28"></div>
              <div>
              <div className="font-bold text-lg">{comp.competitionDetails.name}</div>
              <div>{comp.competitionDetails.begin_time.toString()}</div>
              <div>{comp.competitionDetails.description.slice(0, 51) + (comp.competitionDetails.description.length > 50 ? "....." : "")}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Page;
