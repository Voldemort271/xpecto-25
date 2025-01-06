"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Handjet, Share_Tech } from "next/font/google";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const handjet = Handjet({ subsets: ["latin"] });
const sharetech = Share_Tech({ weight: ["400"], subsets: ["latin"] });

const AuthNavbar = () => {
  const path = usePathname();

  return (
    <div className={`flex h-24 w-screen ${handjet.className} tracking-widest`}>
      <div className="h-full w-80 border-2 border-amber-50 bg-neutral-900"></div>
      <div className="flex h-12 w-full flex-col justify-center border-2 border-l-0 border-amber-50 bg-neutral-900 text-2xl font-light uppercase text-amber-50">
        <MarqueeContainer
          text={[
            "Login to xperience xpecto",
            "Login to xperience xpecto",
            "Login to xperience xpecto",
          ]}
        />
      </div>
    </div>
  );
};

export default AuthNavbar;
