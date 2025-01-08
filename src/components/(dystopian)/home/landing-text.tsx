"use client";

import React from "react";
import Text256 from "@/components/(dystopian)/home/xpecto-256";
import Text200 from "@/components/(dystopian)/home/xpecto-200";

const LandingText = () => {
  return (
    <div className="p-0 md:py-8">
      <div className="hidden lg:block">
        <Text256 />
      </div>
      <div className="hidden md:block lg:hidden">
        <Text200 />
      </div>
    </div>
  );
};

export default LandingText;
