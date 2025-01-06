"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Handjet, Share_Tech } from "next/font/google";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import Link from "next/link";

const handjet = Handjet({ subsets: ["latin"] });
const sharetech = Share_Tech({ weight: ["400"], subsets: ["latin"] });

const AuthNavbar = () => {
  const path = usePathname();

  return (
    <div className={`flex w-screen ${handjet.className} tracking-widest`}>
      <Link
        className="z-10 flex h-28 flex-col items-start justify-center border-2 border-amber-50 bg-neutral-900 px-5 text-amber-50"
        href="/"
      >
        <div className="text-4xl font-medium uppercase">Xpecto &apos;25</div>
        <div className="text-sm font-light uppercase leading-5">
          indian institute of technology, mandi
        </div>
      </Link>
      <div className="flex h-14 w-full flex-col justify-center border-2 border-l-0 bg-amber-50 text-3xl font-normal uppercase text-neutral-900">
        <MarqueeContainer
          cursor
          text={
            path === "/sign-in"
              ? [
                  "don't have an account?",
                  "register for xpecto '25",
                  "don't have an account?",
                  "register for xpecto '25",
                ]
              : [
                  "already have an account?",
                  "sign in to xpecto '25",
                  "already have an account?",
                  "sign in to xpecto '25",
                ]
          }
          href={path === "/sign-in" ? "/sign-up" : "/sign-in"}
        />
      </div>
    </div>
  );
};

export default AuthNavbar;
