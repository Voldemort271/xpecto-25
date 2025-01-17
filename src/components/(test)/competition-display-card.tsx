import React from "react";
import BgImage from "public/images/signin.jpg";
import Image from "next/image";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

import { Share_Tech } from "next/font/google";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const CompDisplayCard = () => {
  return (
    <div className="relative flex w-full flex-col items-center md:flex-row">
      <Image
        src={BgImage}
        alt={"Bg"}
        className="-mt-40 aspect-square min-h-96 w-[calc(100%-100px)] max-w-[500px] border-2 border-amber-50 object-cover md:-ml-40 md:mt-0 md:h-[400px] md:w-[400px] lg:-ml-32 lg:h-[450px] lg:w-[450px]"
      />
      <div className="mt-12 flex w-full flex-col gap-5 md:mt-0">
        <div className="flex flex-wrap items-baseline gap-2.5 px-5">
          <div className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50">
            programming
          </div>
          <div className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50">
            ml/ai
          </div>
        </div>
        <div className="px-5 text-6xl font-bold uppercase lg:text-7xl">
          test comp
        </div>
        <div
          className={`max-w-screen-md px-5 ${sharetech.className} text-lg tracking-tight`}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          alias aliquam aliquid debitis fuga illo ipsum iusto minima qui quidem
          repellendus, rerum similique sint vel velit voluptatem voluptates
          voluptatibus, voluptatum!{" "}
          <span className="inline md:hidden xl:inline">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            alias aliquam aliquid debitis fuga illo ipsum iusto minima qui
            quidem repellendus, rerum similique sint vel velit voluptatem
            voluptates voluptatibus, voluptatum!{" "}
          </span>
        </div>
        <div className="mt-12 flex h-16 w-full flex-col justify-center overflow-clip border-2 border-l-0 border-amber-50 bg-amber-50/[0.7] text-3xl font-normal uppercase text-neutral-900 md:h-12 md:text-2xl">
          <MarqueeContainer
            text={[
              "visit full page",
              "test comp",
              "visit full page",
              "test comp",
              "visit full page",
              "test comp",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CompDisplayCard;
