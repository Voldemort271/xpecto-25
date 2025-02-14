"use client";

import React from "react";
import { Jacquard_24 } from "next/font/google";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const jacquard = Jacquard_24({ weight: "400", subsets: ["latin"] });

const NewspaperNavbar = () => {
  return (
    <div
      className={`relative flex w-screen flex-col items-center px-8 py-5 lg:px-12 ${jacquard.className}`}
    >
      <div className="absolute left-12 top-5 hidden w-full max-w-64 text-base leading-4 xl:block">
        Issue #25, 32 to 56 March 2025 <br /> Twenty-second reprint <br />
        <br className="hidden lg:block" />{" "}
        {!useUser().isSignedIn && (
          <Link href={"/sign-in"} className="text-xl leading-4">
            Login to our website to view previous reprints
          </Link>
        )}
        <br /> I don&apos;t know what else to put here cause lowkey I&apos;m
        just a chill guy
      </div>
      <Link
        className="mb-1 text-center text-[40px] font-medium leading-[40px] md:-mb-2 md:text-6xl lg:text-8xl"
        href={"/"}
      >
        The Xpecto Times
      </Link>
      <div className="text-center text-[18px] leading-[20px] md:text-xl lg:text-2xl">
        The Biggest Fest of the Great Himalayas
      </div>
      <div className="text-center text-[18px] leading-[20px] md:hidden">
        32 to 56 March, 2025
      </div>
      <div className="mt-5 hidden w-full justify-center border-y-2 border-neutral-900/[0.7] py-1 md:flex md:gap-5 lg:gap-8">
        <Link href={"/"} className="text-3xl">
          Home
        </Link>
        |
        <Link href={"/competitions"} className="text-3xl">
          Competitions
        </Link>
        |
        <Link href={"/workshops"} className="text-3xl">
          Workshops
        </Link>
        |
        <Link href={"/expos"} className="text-3xl">
          Expos
        </Link>
        |
        <Link href={"/pronites"} className="text-3xl">
          Pronites
        </Link>
        |
        <Link href={"/sponsors"} className="text-3xl">
          Sponsors
        </Link>
      </div>
    </div>
  );
};

export default NewspaperNavbar;
