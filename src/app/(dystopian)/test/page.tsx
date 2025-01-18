import React from "react";
import CompetitionsHeader from "@/components/(test)/competitions-header";
import CompDisplay from "@/components/(test)/competition-display";

const TestPage = () => {
  return (
    <>
      <div className="grid w-screen grid-rows-[400px_auto] overflow-clip bg-neutral-900 md:h-screen md:grid-cols-[200px_auto] md:grid-rows-1 lg:grid-cols-[300px_auto] xl:grid-cols-[350px_auto]">
        <div className="relative h-full w-full">
          <CompetitionsHeader />
        </div>
        <div className="relative h-full w-full">
          <CompDisplay />
        </div>
      </div>
    </>
  );
};

export default TestPage;
