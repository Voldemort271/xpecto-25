"use client";
import React, { useState } from "react";
import { api } from "@/trpc/react";
import CompControl from "@/components/(dystopian)/competitions/competition-display-control";
import WorkDisplayCard from "@/components/(dystopian)/workshops/workshop-display-card";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { AnimatePresence } from "motion/react";

const Page = () => {
  const { data: workshops, isLoading } =
    api.workshop.getWorkshop.useQuery();
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="grid h-full w-full grid-rows-[56px_auto] md:grid-cols-[64px_auto] md:grid-rows-1">
        <div className="h-full w-full">
          {!isLoading && workshops ? (
            <>
            
            <CompControl
              index={index}
              setIndex={setIndex}
              length={workshops.length}
            />
            
            </>
            
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
          {!isLoading && workshops && workshops[index] ? (
            <AnimatePresence mode="wait">
              <WorkDisplayCard
                comp={workshops[index]}
                key={index}
              ></WorkDisplayCard>
            </AnimatePresence>  
          ) : (
            <div className="loading h-full w-full"></div>
          )}
        </div>
      </div>
    </>
  );
};
export default Page;
