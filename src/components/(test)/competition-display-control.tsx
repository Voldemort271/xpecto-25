import React from "react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const CompControl = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 top-0 flex h-16 w-[50vh] -translate-x-[calc(50%-32px)] translate-y-[calc(25vh-32px)] -rotate-90 flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase">
        <MarqueeContainer
          text={[
            "previous event",
            "previous event",
            "previous event",
            "previous event",
          ]}
        />
      </div>
      <div className="absolute left-0 top-0 flex h-16 w-[50vh] -translate-x-[calc(50%-32px)] translate-y-[calc(75vh-32px)] -rotate-90 flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase">
        <MarqueeContainer
          text={["next event", "next event", "next event", "next event"]}
        />
      </div>
    </div>
  );
};

export default CompControl;
