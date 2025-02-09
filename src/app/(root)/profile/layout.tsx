import React from "react";
import { Handjet } from "next/font/google";
import BgPic from "public/images/background-teams.png";
import Image from "next/image";

const handjet = Handjet({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`relative z-0 flex min-h-screen w-screen border-2 border-amber-50 bg-neutral-900 text-amber-50 ${handjet.className} tracking-widest`}
    >
      <Image
        src={BgPic}
        alt={"Background"}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="mt-32 flex h-full w-full flex-col items-center px-5 sm:px-12 lg:mt-40">
        {children}
      </div>
    </div>
  );
}
