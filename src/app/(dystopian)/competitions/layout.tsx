"use client";

import React from "react";
import { Handjet } from "next/font/google";
import CompetitionsHeader from "@/components/(dystopian)/competitions/competitions-header";
import { usePathname } from "next/navigation";

const handjet = Handjet({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname();

  return (
    <div
      className={
        path === "/competitions"
          ? `grid w-screen grid-rows-[400px_auto] overflow-clip bg-neutral-900 md:h-screen md:grid-cols-[200px_auto] md:grid-rows-1 lg:grid-cols-[300px_auto] xl:grid-cols-[350px_auto] ${handjet.className}`
          : `grid w-screen grid-rows-[64px_auto] overflow-clip bg-neutral-900 md:h-screen md:grid-cols-[64px_auto] md:grid-rows-1 ${handjet.className}`
      }
    >
      <div className="relative h-full w-full">
        <CompetitionsHeader />
      </div>
      <div className="relative h-full w-full bg-red-400">{children}</div>
    </div>
  );
}
