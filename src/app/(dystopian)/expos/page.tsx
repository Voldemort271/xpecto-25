"use client";
import React, { useEffect } from "react";
import { api } from "@/trpc/react"; // Import the api object
import Link from "next/link";
import SectionHeader from "@/components/(dystopian)/common/section-header";


const Page = () => {
  const { data: expos } = api.expo.getExpo.useQuery();

  useEffect(() => {
    if (expos) {
      console.log("competition", expos);
    }
  }, [expos]);


  return (
    <>
    {/* //TODO: Add a searchbar for competitions */}
    <SectionHeader title="Expos">Enjoy the expos</SectionHeader>
      <div className="flex flex-col justify-center items-center gap-5">
        {expos?.map((comp) => {
          return (
            <Link href={`/expos/${comp.exposDetails.slug}`} key={comp.id} className="flex gap-2 items-center border-2 p-2 rounded-lg bg-amber-50 text-neutral-900">
              <div
                style={{ backgroundImage: `url(/event_covers/competitions/${comp.exposDetails.slug}.jpeg), url(logo.enc)` }}
                className="flex h-28 w-28 items-center justify-center bg-cover bg-no-repeat rounded-full"
              >
              </div>
              <div className="bg-amber-50 w-1 h-28"></div>
              <div>
              <div className="font-bold text-lg">{comp.exposDetails.name}</div>
              <div>{comp.exposDetails.begin_time.toString()}</div>
              <div>{comp.exposDetails.description.slice(0, 51) + (comp.exposDetails.description.length > 50 ? "....." : "")}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Page;
