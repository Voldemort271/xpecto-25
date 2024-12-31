import React from "react";
import { Handjet } from "next/font/google";
import SectionHeader from "@/components/(dystopian)/common/section-header";

const handjet = Handjet({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`relative flex w-screen border-2 border-amber-50 bg-neutral-900 text-amber-50 ${handjet.className} tracking-widest`}
    >
      <div className="mt-[124px] w-full">
        <SectionHeader title="competitions">prove your mettle</SectionHeader>
        {children}
      </div>
    </div>
  );
}
