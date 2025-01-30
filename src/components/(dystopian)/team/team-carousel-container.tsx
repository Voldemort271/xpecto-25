import React, { type ReactNode } from "react";
import Image from "next/image";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import type { TeamData } from "@/app/types";

interface Props {
  children: ReactNode;
  data: TeamData[];
  index: number;
}

const TeamCarouselContainer = ({ children, data, index }: Props) => {
  return (
    <div className="relative z-0 grid h-full w-full grid-rows-[56px_auto_56px] bg-neutral-900 pt-[126px] md:grid-cols-[64px_auto_64px] md:grid-rows-1 md:pt-0 lg:grid-cols-[56px_auto_56px]">
      <Image
        src={
          "https://res.cloudinary.com/diqdg481x/image/upload/v1737737277/background_eqguit.jpg"
        }
        width={1920}
        height={1080}
        alt={"Background"}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-bottom opacity-20"
      />
      <div className="relative h-full w-full">
        <div className="absolute left-0 top-0 flex h-14 w-screen flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-2xl font-light uppercase md:top-1 md:h-16 md:w-[100vh] md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:-rotate-90 md:text-3xl lg:h-14 lg:text-2xl">
          <MarqueeContainer
            text={[
              "xpecto '25 squad",
              "32 to 56 march 2025",
              "iit mandi",
              "xpecto '25 squad",
              "32 to 56 march 2025",
              "iit mandi",
            ]}
          />
        </div>
      </div>
      <div className="relative h-full w-full">{children}</div>
      <div className="relative h-full w-full">
        <div className="absolute left-0 top-0 flex h-14 w-screen flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-2xl font-light uppercase md:top-1 md:h-16 md:w-[100vh] md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:rotate-90 md:text-3xl lg:left-[-4px] lg:h-14 lg:text-2xl">
          <MarqueeContainer
            text={
              data?.[index]
                ? [
                    data[index].name,
                    data[index].role === "convenor" ||
                    data[index].role === "co-convenor"
                      ? data[index].role
                      : data[index].org + " " + data[index].role,
                    data[index].name,
                    data[index].role === "convenor" ||
                    data[index].role === "co-convenor"
                      ? data[index].role
                      : data[index].org + " " + data[index].role,
                    data[index].name,
                    data[index].role === "convenor" ||
                    data[index].role === "co-convenor"
                      ? data[index].role
                      : data[index].org + " " + data[index].role,
                  ]
                : [
                    "unknown player",
                    "anonymous programmer",
                    "unknown player",
                    "anonymous programmer",
                    "unknown player",
                    "anonymous programmer",
                  ]
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TeamCarouselContainer;
