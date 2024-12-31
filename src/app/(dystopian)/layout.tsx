import React from "react";
import DystopianNav from "@/components/(dystopian)/common/navbar";
import { Handjet } from "next/font/google";
import { CursorProvider } from "@/context/cursor-context";
import DystopianCursor from "@/components/(dystopian)/common/cursor";

const handjet = Handjet({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CursorProvider>
      <div
        className={`relative h-screen w-screen cursor-none bg-neutral-900 text-amber-50 ${handjet.className} tracking-widest`}
      >
        <DystopianCursor />
        <div className="fixed left-0 top-0 z-40 w-screen">
          <DystopianNav />
        </div>
        {children}
      </div>
    </CursorProvider>
  );
}
