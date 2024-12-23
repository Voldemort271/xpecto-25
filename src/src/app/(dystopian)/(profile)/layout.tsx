import React from "react";
import { Handjet } from "next/font/google";
import ProfileSidebar from "@/components/(dystopian)/profile-sidebar";

const handjet = Handjet({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`relative flex h-screen w-screen border-2 border-amber-50 bg-neutral-900 text-amber-50 ${handjet.className} tracking-widest`}
    >
      <ProfileSidebar />
      <div className="mt-32 h-full w-full lg:mt-40">{children}</div>
    </div>
  );
}
