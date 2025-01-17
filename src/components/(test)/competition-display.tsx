import React from "react";
import CompControl from "@/components/(test)/competition-display-control";
import CompDisplayCard from "@/components/(test)/competition-display-card";

const CompDisplay = () => {
  return (
    <div className="grid h-full w-full grid-rows-[56px_auto] md:grid-cols-[64px_auto] md:grid-rows-1">
      <div className="h-full w-full">
        <CompControl />
      </div>
      <div className="flex h-full w-full flex-col justify-center">
        <CompDisplayCard />
      </div>
    </div>
  );
};

export default CompDisplay;
