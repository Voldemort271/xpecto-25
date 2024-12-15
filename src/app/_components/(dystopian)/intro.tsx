import React from "react";
import MarqueeContainer from "@/app/_components/(dystopian)/marquee-container";

const IntroScreen = () => {
  return (
    <div className="relative h-[calc(100vh-208px)] w-screen bg-neutral-900 lg:h-[calc(100vh-236px)]">
      intro
      <div className="absolute bottom-0 left-0 h-20 w-screen bg-amber-50 text-4xl font-medium uppercase text-neutral-900">
        <MarqueeContainer text={["hi", "hello"]} />
      </div>
    </div>
  );
};

export default IntroScreen;
