import React from "react";
import MarqueeContainer from "@/components/common/marquee-container";
import type { WorkshopWithDetails } from "@/app/types";
import { formatDuration, getLowestPrice } from "@/lib/utils";

interface Props {
  data: WorkshopWithDetails;
}




const WorkshopBrief = ({ data }: Props) => {
  const details = [
    { name: "Entry fee", content: getLowestPrice(data.workshopDetails.regPlans)},
    { name: "Extraction point", content: data.workshopDetails.venue },
    {
      name: "zero hour",
      content: data.workshopDetails.begin_time.toLocaleString(),
    },
    {
      name: "final hour",
      content: data.workshopDetails.end_time.toLocaleString(),
    },
    {
      name: "duration",
      content: formatDuration(data.workshopDetails.begin_time, data.workshopDetails.end_time),
    },
  ];

  return (
    <div className="relative w-full overflow-auto overscroll-none border-2 border-amber-50 bg-neutral-900 md:h-full">
      <div className="sticky left-0 top-0 z-10 flex h-8 w-full flex-col justify-center overflow-clip border-b-2 border-amber-50 bg-neutral-900 text-lg font-extralight uppercase text-amber-50">
        <MarqueeContainer
          text={[
            "mission briefing",
            data.workshopDetails.name,
            "more details",
            data.workshopDetails.name,
            "mission briefing",
            data.workshopDetails.name,
            "more details",
            data.workshopDetails.name,
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
    </div>
  );
};

export default WorkshopBrief;
