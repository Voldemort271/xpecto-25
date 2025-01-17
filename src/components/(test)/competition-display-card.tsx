import React from "react";
import BgImage from "public/images/signin.jpg";
import Image from "next/image";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

import { Share_Tech } from "next/font/google";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const CompDisplayCard = () => {
  return (
    <div className="relative flex w-full flex-row items-center">
      <Image
        src={BgImage}
        alt={"Bg"}
        className="-ml-48 h-[400px] w-[400px] border-2 border-amber-50 object-cover lg:-ml-24 lg:h-[500px] lg:w-[500px]"
      />
      <div className="flex w-full flex-col gap-5">
        <div className="flex gap-2.5 pl-5">
          <div className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50">
            programming
          </div>
          <div className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50">
            ml/ai
          </div>
        </div>
        <div className="pl-5 text-6xl font-bold uppercase lg:text-7xl">
          test comp
        </div>
        <div
          className={`max-w-screen-md pl-5 ${sharetech.className} tracking-tight`}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          alias aliquam aliquid debitis fuga illo ipsum iusto minima qui quidem
          repellendus, rerum similique sint vel velit voluptatem voluptates
          voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Ad adipisci dolores expedita itaque minima obcaecati
          repellat, unde. Aliquam, consequuntur cum ipsum iusto laboriosam nihil
          reiciendis. Enim maxime perferendis porro quas.
        </div>
        <div className="mt-5 flex h-12 w-full flex-col justify-center overflow-clip border-2 border-l-0 border-amber-50 bg-amber-50/[0.7] text-2xl font-normal uppercase text-neutral-900">
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
