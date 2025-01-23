import React from "react";
import BgImage from "public/images/signin.jpg";
import Image from "next/image";
import { Share_Tech } from "next/font/google";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const details = [
  { name: "Bounty", content: "200.00 INR" },
  { name: "Extraction point", content: "My mom house" },
  { name: "Squad strength", content: "3 - 6" },
  { name: "zero hour", content: "12/23/33 34:55 pm" },
  { name: "initiation fee", content: "2.00 INR" },
];

const TestPage = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center md:flex-row">
      <Image
        src={BgImage}
        alt={"Hello"}
        width={500}
        height={500}
        className="z-10 -mt-[212px] ml-0 h-96 w-full border-2 border-amber-50 object-cover object-center md:-ml-[138px] md:mt-0 md:h-full md:w-[300px] lg:-ml-[238px] lg:w-[400px] xl:-ml-72 xl:w-[500px]"
      />
      <div className="relative flex h-full w-full flex-col gap-5 overflow-scroll p-12 pb-28 md:pt-28">
        <div className="-mb-2.5 flex flex-wrap gap-2.5">
          <div className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50">
            programming
          </div>
          <div className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50">
            ml/ai
          </div>
        </div>
        <div className="text-6xl font-semibold uppercase tracking-wider lg:text-7xl lg:font-bold xl:text-8xl">
          untitled event
        </div>
        <div
          className={`${sharetech.className} max-w-screen-lg text-base tracking-tight text-amber-50 lg:text-lg`}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at
          cupiditate iure nihil odio praesentium quaerat sequi unde? Commodi
          debitis dolorum ea enim in numquam officiis reprehenderit saepe?
          Distinctio, expedita. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Animi, iste, nemo. Architecto cum cumque error
          facere facilis laboriosam libero neque, optio quae quidem repellendus
          sequi sit unde velit, voluptatibus voluptatum.
        </div>
        <div className="relative mt-12 h-96 w-full max-w-screen-md overflow-scroll overscroll-none border-2 border-amber-50 bg-neutral-900 md:h-full md:max-h-96">
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
