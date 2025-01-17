import React from "react";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`relative flex min-h-screen w-screen border-2 border-amber-50 bg-black text-amber-50 ${handjet.className} overflow-clip tracking-widest`}
    >
      <div className="mt-[60px] w-full">{children}</div>
    </div>
  );
}
