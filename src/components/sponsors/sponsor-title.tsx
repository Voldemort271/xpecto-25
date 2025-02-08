import React from "react";
import Image from "next/image";
import MarqueeContainer from "@/components/common/marquee-container";

const SponsorTitle = () => {
  return (
    <>
      <div className="relative z-0 flex h-[70vh] w-full flex-col items-center justify-center p-5 pt-44 sm:p-12 sm:pt-28">
        <Image
          src={`https://res.cloudinary.com/diqdg481x/image/upload/v1737789549/spon_ljtsho.png`}
          width={1920}
          height={500}
          alt={"Sponsors title bg"}
          className="absolute left-0 top-0 -z-10 h-full w-full border-2 border-amber-50 object-cover object-center"
        />
        <div className="text-center text-8xl font-extrabold uppercase text-amber-50 sm:text-9xl md:text-[216px] lg:text-[256px]">
          partners
        </div>
        <div className="-mt-4 text-center text-2xl font-normal uppercase text-amber-50 md:-mt-8 md:text-5xl md:font-semibold">
          sponsors and organisers
        </div>
      </div>
      <div className="relative flex h-16 w-full flex-col justify-center overflow-clip border-2 border-t-0 border-amber-50 text-4xl font-normal uppercase text-amber-50">
        <MarqueeContainer
          text={[
            "sponsors and organisers",
            "sponsors and organisers",
            "sponsors and organisers",
            "sponsors and organisers",
          ]}
          delay={-0.5}
        />
      </div>
    </>
  );
};

export default SponsorTitle;
