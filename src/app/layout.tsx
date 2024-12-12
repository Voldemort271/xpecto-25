import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import SharedContextProvider from "@/lib/context";
import React from "react";

export const metadata: Metadata = {
  title: "Xpecto '25 | IIT Mandi",
  description: "Blah blah here",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="staticBg"></div>
        <ClerkProvider>
          <TRPCReactProvider>
            <SharedContextProvider>{children}</SharedContextProvider>
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
