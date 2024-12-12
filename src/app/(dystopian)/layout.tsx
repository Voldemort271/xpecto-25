import React from "react";
import DystopianNav from "@/app/_components/(dystopian)/navbar";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`relative h-screen w-screen border-2 border-amber-50 bg-neutral-900 text-amber-50 ${handjet.className} tracking-widest`}
    >
      <div className="fixed left-0 top-0 z-50 w-screen">
        <DystopianNav />
      </div>
      {children}
    </div>
  );
}
