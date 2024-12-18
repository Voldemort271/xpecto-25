import React from "react";
import { Jacquard_24 } from "next/font/google";

const jacquard = Jacquard_24({ weight: "400", subsets: ["latin"] });

const NewspaperNavbar = () => {
  return (
    <div
      className={`relative flex w-screen flex-col items-center px-12 py-5 ${jacquard.className}`}
    >
      <div className="absolute left-12 top-5 w-full max-w-64 leading-none">
        Issue #25, 32 to 56 March 2025 <br /> Twenty-second reprint <br />
        <br />{" "}
        <span className="text-xl leading-4">
          Login to our website to view previous reprints
        </span>
        <br /> I don&apos;t know what else to put here cause lowkey I&apos;m
        just a chill guy
      </div>
      <div className="-mb-2 text-8xl font-medium">The Xpecto Times</div>
      <div className="text-2xl">The Biggest Fest of the Great Himalayas</div>
      <div className="mt-5 flex w-full justify-center gap-12 border-y-2 border-neutral-900/[0.7] py-1">
        <div className="text-3xl">Home</div>|
        <div className="text-3xl">About</div>|
        <div className="text-3xl">Events</div>|
        <div className="text-3xl">Contact</div>|
        <div className="text-3xl">Sponsors</div>
      </div>
    </div>
  );
};

export default NewspaperNavbar;
