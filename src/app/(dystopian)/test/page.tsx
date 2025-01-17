import React from "react";
import CompetitionsHeader from "@/components/(test)/competitions-header";
import CompDisplay from "@/components/(test)/competition-display";

const TestPage = () => {
  return (
    <div className="grid h-screen w-screen grid-cols-[300px_auto]">
      <div className="relative h-full w-full">
        <CompetitionsHeader />
      </div>
      <div className="relative h-full w-full">
        <CompDisplay />
      </div>
    </div>
  );
};

export default TestPage;
