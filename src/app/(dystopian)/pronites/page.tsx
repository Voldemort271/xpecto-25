"use client";
import React, { useEffect } from "react";
import { api } from "@/trpc/react"; // Import the api object
import Link from "next/link";
import { motion } from "motion/react";
import SectionHeader from "@/components/(dystopian)/common/section-header"; 
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const Page = () => {
  const { data: pronites } = api.pronite.getPronite.useQuery();

  useEffect(() => {
    if (pronites) {
      console.log("pronites", pronites);
    }
  }, [pronites]);


  return (
    <>
    {/* //TODO: Add a searchbar for competitions */}
    <SectionHeader title="Pronites">Enjoy the night</SectionHeader>
      <div className="flex flex-col justify-center items-center gap-5">
        {pronites?.map((comp) => {
          return (
            <Link href={`/pronites/${comp.proniteDetails.slug}`} key={comp.id} className="flex gap-2 items-center border-2 p-2 rounded-lg bg-amber-50 text-neutral-900">
              <div
                style={{ backgroundImage: `url(/event_covers/competitions/${comp.proniteDetails.slug}.jpeg), url(logo.enc)` }}
                className="flex h-28 w-28 items-center justify-center bg-cover bg-no-repeat rounded-full"
              >
              </div>
              <div className="bg-amber-50 w-1 h-28"></div>
              <div>
              <div className="font-bold text-lg">{comp.proniteDetails.name}</div>
              <div>{comp.proniteDetails.begin_time.toString()}</div>
              <div>{comp.proniteDetails.description.slice(0, 51) + (comp.proniteDetails.description.length > 50 ? "....." : "")}</div>
              </div>
            </Link>
          );
        })}
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
