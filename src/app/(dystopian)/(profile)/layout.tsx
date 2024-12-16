import React from "react";
import { Handjet } from "next/font/google";
import ProfileSidebar from "@/app/_components/(dystopian)/profile-sidebar";

const handjet = Handjet({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <div
        className={`relative flex h-screen w-screen border-2 border-amber-50 bg-neutral-900 text-amber-50 ${handjet.className} tracking-widest`}
      >
        <ProfileSidebar />
        <div className="lg:mt-40 mt-32 w-full h-full">
        {children}
        </div>
      </div>
  );
}
