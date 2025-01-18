import React from "react";
import PronitesControl from "@/components/(dystopian)/pronites/pronites-details-control";
import PronitesDetails from "@/components/(dystopian)/pronites/pronites-details";

const PronitesDisplay = () => {
  return (
    <div className="relative z-0 h-full w-full">
      <PronitesDetails />
      <PronitesControl />
    </div>
  );
};

export default PronitesDisplay;
