import React from "react";
import { Jacquard_24 } from "next/font/google";

const jacquard = Jacquard_24({ weight: "400", subsets: ["latin"] });

const NewspaperNavbar = () => {
  return (
    <div
      className={`relative flex w-screen flex-col items-center px-8 lg:px-12 py-5 ${jacquard.className}`}
    >
      <div className="hidden xl:block absolute left-12 top-5 w-full max-w-64 text-xl leading-4">
        Issue #25, 32 to 56 March 2025 <br /> Twenty-second reprint <br />
        <br className="hidden lg:block" />{" "}
        <span className="">
          Login to our website to view previous reprints
        </span>
        <br /> I don&apos;t know what else to put here cause lowkey I&apos;m
        just a chill guy
      </div>
      <div className="mb-1 md:-mb-2 text-[40px] leading-[40px] font-medium md:text-6xl lg:text-8xl text-center">The Xpecto Times</div>
      <div className="text-center text-[18px] leading-[20px] md:text-xl lg:text-2xl ">The Biggest Fest of the Great Himalayas</div>
      <div className="text-center text-[18px] leading-[20px] md:hidden ">32 to 56 March, 2025</div>
      <div className="hidden mt-5 md:flex w-full justify-center md:gap-8 lg:gap-12 border-y-2 border-neutral-900/[0.7] py-1">
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
