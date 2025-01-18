import React from "react";
import { Handjet } from "next/font/google";
import CompetitionsHeader from "@/components/(dystopian)/(competitions)/competitions-header";

const handjet = Handjet({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`grid w-screen grid-rows-[400px_auto] overflow-clip bg-neutral-900 md:h-screen md:grid-cols-[200px_auto] md:grid-rows-1 lg:grid-cols-[300px_auto] xl:grid-cols-[350px_auto] ${handjet.className}`}
    >
      <div className="relative h-full w-full">
        <CompetitionsHeader />
      </div>
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
