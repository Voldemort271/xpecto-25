import React from "react";
import BgImage from "public/images/signin.jpg";
import Image from "next/image";
import { Share_Tech } from "next/font/google";
import MissionBrief from "@/components/(dystopian)/competitions/mission-briefing";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const TestPage = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-start md:flex-row">
      <Image
        src={`https://res.cloudinary.com/diqdg481x/image/upload/v1737737280/signin_iiaec7.jpg`}
        alt={"Hello"}
        width={500}
        height={500}
        className="z-10 -mt-[212px] ml-0 h-96 w-full border-2 border-amber-50 object-cover object-center md:-ml-[138px] md:mt-0 md:h-full md:w-[300px] lg:-ml-[238px] lg:w-[400px] xl:-ml-72 xl:w-[500px]"
      />
      <div className="relative w-full">
        <div className="w-full space-y-5 overflow-scroll p-12 pb-28 md:h-screen md:pt-28">
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
            facere facilis laboriosam libero neque, optio quae quidem
            repellendus sequi sit unde velit, voluptatibus voluptatum.
          </div>
          <div className="grid max-w-screen-xl grid-cols-1 gap-5 xl:grid-cols-[55%_auto]">
            <MissionBrief />
            <MissionBrief />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-30 flex h-14 w-full flex-col justify-center overflow-clip border-2 border-amber-50 bg-amber-50/[0.7] text-3xl font-light uppercase text-neutral-900 backdrop-blur-2xl md:border-l-0">
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
