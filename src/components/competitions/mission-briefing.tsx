import React from "react";
import MarqueeContainer from "@/components/common/marquee-container";

const details = [
  { name: "Bounty", content: "200.00 INR" },
  { name: "Extraction point", content: "My mom house" },
  { name: "Squad strength", content: "3 - 6" },
  { name: "zero hour", content: "12/23/33 34:55 pm" },
  { name: "initiation fee", content: "2.00 INR" },
];

const MissionBrief = () => {
  return (
    <div className="relative w-full overflow-scroll overscroll-none border-2 border-amber-50 bg-neutral-900 md:h-full">
      <div className="sticky left-0 top-0 z-10 flex h-8 w-full flex-col justify-center overflow-clip border-b-2 border-amber-50 bg-neutral-900 text-lg font-extralight uppercase text-amber-50">
        <MarqueeContainer
          text={[
            "mission briefing",
            "untitled event",
            "more details",
            "untitled event",
            "mission briefing",
            "untitled event",
            "more details",
            "untitled event",
          ]}
          delay={-1}
        />
      </div>
      <div className="grid min-h-[348px] w-full grid-cols-1 gap-5 p-5 text-amber-50 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {details.map((el, i) => (
          <div
            className="flex w-full flex-col items-center -space-y-1 text-center"
            key={i}
          >
            <div className={`text-xl font-light uppercase text-amber-400`}>
              {el.name}
            </div>
            <div
              className={`text-4xl font-light uppercase text-amber-50/[0.8]`}
            >
              {el.content}
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex h-12 w-full flex-col justify-center overflow-clip border-t-2 border-amber-50 bg-amber-50/[0.7] text-2xl font-normal uppercase text-neutral-900">
        <MarqueeContainer
          text={[
            "view intel brief",
            "untitled event",
            "view intel brief",
            "untitled event",
          ]}
          href={"/"}
          delay={-2}
        />
      </div>
    </div>
  );
};

export default MissionBrief;
