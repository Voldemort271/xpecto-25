"use client";
import React, { useEffect } from "react";
import { api } from "@/trpc/react";
import CompCard from "@/components/(dystopian)/(competitions)/competition-card";
import { motion } from "motion/react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import SectionHeader from "@/components/(dystopian)/common/section-header";
const Page = () => {
  const { data: competitions, isLoading } =
    api.competition.getCompetitions.useQuery();

  useEffect(() => {
    if (competitions) {
      console.log("competition", competitions);
    }
  }, [competitions]);

  return (
    <>
      {/* //TODO: Add a searchbar for competitions */}
      <SectionHeader title="competitions">prove your mettle</SectionHeader>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && (
          <div className="overlay">
            <img
              className="loader"
              src="/loading.gif"
              width="190rem"
              height="190rem"
            ></img>
          </div>
        )}

        {competitions?.map((el, i) => (
          <CompCard
            key={i}
            img={`/event_covers/competitions/${el.competitionDetails.slug}.jpeg`}
            title={el.competitionDetails.slug}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            details={el.competitionDetails.begin_time.toLocaleString()}
          />
        ))}
      </div>
      <motion.div
        className={`flex h-16 w-full flex-row items-center overflow-hidden border-t-2 border-amber-50 bg-neutral-900 text-4xl font-normal uppercase text-amber-50`}
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
