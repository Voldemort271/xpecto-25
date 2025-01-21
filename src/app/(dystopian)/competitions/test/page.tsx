import React from "react";
import BgImage from "public/images/signin.jpg";
import Image from "next/image";
import { Share_Tech } from "next/font/google";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const TestPage = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center md:flex-row">
      <Image
        src={BgImage}
        alt={"Hello"}
        width={500}
        height={500}
        className="z-10 -mt-[212px] ml-0 h-full min-h-96 w-full border-2 border-amber-50 object-cover object-center md:-ml-[138px] md:mt-0 md:w-[300px] lg:-ml-[238px] lg:w-[400px] xl:-ml-72 xl:w-[500px]"
      />
      <div className="relative flex h-full w-full flex-col gap-5 overflow-scroll p-12 pb-28 md:pt-28">
        <div className="text-6xl font-semibold uppercase tracking-wider lg:text-7xl lg:font-bold xl:text-8xl">
          untitled event
        </div>
        <div
          className={`${sharetech.className} max-w-screen-md text-base tracking-tight text-amber-50 lg:text-lg`}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at
          cupiditate iure nihil odio praesentium quaerat sequi unde? Commodi
          debitis dolorum ea enim in numquam officiis reprehenderit saepe?
          Distinctio, expedita. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Animi, iste, nemo. Architecto cum cumque error
          facere facilis laboriosam libero neque, optio quae quidem repellendus
          sequi sit unde velit, voluptatibus voluptatum.
        </div>
        <div className="relative mt-5 h-full w-full max-w-screen-lg overflow-scroll overscroll-none border-2 border-amber-50 bg-neutral-900">
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
          <div className="sticky bottom-0 left-0 right-0 top-0 z-0 h-full w-full bg-red-900/[0.2]"></div>
          <div className="h-full w-full bg-blue-400"></div>
        </div>
        <div className="absolute bottom-0 left-0 flex h-14 w-full flex-col justify-center overflow-clip border-2 border-amber-50 bg-amber-50/[0.7] text-3xl font-light uppercase text-neutral-900">
          <MarqueeContainer
            text={[
              "register for untitled event",
              "xpecto 25",
              "iit mandi",
              "register for untitled event",
              "xpecto 25",
              "iit mandi",
            ]}
            href={"/"}
            delay={-2}
          />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
