import React from "react";
import { IM_Fell_Double_Pica } from "next/font/google";
import { CursorProvider } from "@/context/cursor-context";
import NewspaperBg from "public/newspaper-bg.png";
import Image from "next/image";
import NewspaperNavbar from "@/components/(newspaper)/navbar";

const imfell = IM_Fell_Double_Pica({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CursorProvider>
      <div
        className={`relative h-full min-h-screen w-screen border-2 border-neutral-900 ${imfell.className}`}
      >
        <Image
          src={NewspaperBg}
          alt={"Background"}
          className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-screen object-cover"
        />
        <NewspaperNavbar />
        {children}
      </div>
    </CursorProvider>
  );
}
