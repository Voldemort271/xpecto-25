"use client";
import React, { useEffect } from "react";
import { api } from "@/trpc/react";
import Link from "next/link";
import CompCard from "@/components/(dystopian)/(competitions)/competition-card";
import { motion } from "motion/react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

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
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {competitions?.map((el, i) => <CompCard key={i} />)}
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        {competitions?.map((comp) => {
          return (
            <Link
              href={`/competitions/${comp.competitionDetails.name}`}
              key={comp.id}
              className="flex items-center gap-2 rounded-lg border-2 bg-amber-50 p-2 text-neutral-900"
            >
              <div
                style={{
                  backgroundImage: `url(/event_covers/competitions/${comp.competitionDetails.name.replace(" ", "%20")}.jpeg), url(logo.enc)`,
                }}
                className="flex h-28 w-28 items-center justify-center rounded-full bg-cover bg-no-repeat"
              ></div>
              <div className="h-28 w-1 bg-amber-50"></div>
              <div>
                <div className="text-lg font-bold">
                  {comp.competitionDetails.name}
                </div>
                <div>{comp.competitionDetails.begin_time.toString()}</div>
                <div>
                  {comp.competitionDetails.description.slice(0, 51) +
                    (comp.competitionDetails.description.length > 50
                      ? "....."
                      : "")}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <motion.div
        className={`flex h-16 w-full flex-row items-center overflow-hidden border-t-2 border-amber-50 bg-amber-50/[0.5] text-4xl font-normal uppercase text-neutral-900`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="flex h-full w-full cursor-none flex-col items-center justify-center"
          initial={{ translateY: -50, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.125 }}
        >
          <MarqueeContainer
            text={[
              "you have reached the end",
              "that's all we have for now",
              "you have reached the end",
              "that's all we have for now",
            ]}
            delay={1}
          />
        </motion.span>
      </motion.div>
    </>
  );
};
export default Page;
