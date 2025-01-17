import React from "react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import Image from "next/image";
import BgImage from "public/images/transparent-bg.png";

const CompetitionsHeader = () => {
  return (
    <div className="relative flex h-full w-full flex-row gap-0 bg-neutral-900">
      <Image
        src={BgImage}
        alt={"Bg Image"}
        className="absolute left-0 top-0 h-full w-full object-cover object-center"
      />
      <div className="absolute left-0 top-0 flex h-16 w-[100vh] -translate-x-[calc(50%-32px)] translate-y-[calc(50vh-32px)] -rotate-90 flex-col justify-center border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase">
        <MarqueeContainer
          text={[
            "Competitions",
            "xpecto '25",
            "iit mandi",
            "Competitions",
            "xpecto '25",
            "iit mandi",
            "Competitions",
            "xpecto '25",
            "iit mandi",
          ]}
        />
      </div>
    </div>
  );
};

export default CompetitionsHeader;
