import React from "react";
import { Handjet } from "next/font/google";
import MarqueeContainer from "@/components/common/marquee-container";
import Link from "next/link";

const handjet = Handjet({ subsets: ["latin"] });

const NotFound = () => {
  return (
    <div
      className={`flex h-screen w-screen flex-col items-center justify-center bg-neutral-950 p-24 ${handjet.className} tracking-wider text-amber-50`}
    >
      <div className="relative flex h-36 w-screen flex-col items-center overflow-clip border-y-4 border-red-500 text-9xl font-extrabold uppercase tracking-widest text-red-500">
        <MarqueeContainer
          text={[
            "error 404",
            "page not found",
            "critical",
            "error 404",
            "page not found",
            "critical",
          ]}
        />
      </div>
      <Link
        href={"/"}
        className="my-5 text-center text-2xl uppercase text-neutral-400 hover:underline"
        title="Go back to home"
      >
        reset timeline
      </Link>
      <div className="relative flex h-36 w-screen flex-col items-center overflow-clip border-y-4 border-red-500 text-9xl font-extrabold uppercase tracking-widest text-red-500">
        <MarqueeContainer
          text={[
            "error 404",
            "page not found",
            "critical",
            "error 404",
            "page not found",
            "critical",
          ]}
          delay={-1}
        />
      </div>
    </div>
  );
};

export default NotFound;
