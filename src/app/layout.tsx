import "@/styles/globals.css";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import SharedContextProvider from "@/lib/context";
import React from "react";
import { Toaster } from "sonner";
import TardisNav from "@/components/root/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xpecto.org/"),
  title: "Xpecto '25 | IIT Mandi",
  description: "The technical festival of IIT Mandi. 29 to 31 March.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
// TODO: Add opengraph

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="relative">
        <ClerkProvider>
          <TRPCReactProvider>
            <SharedContextProvider>
              <GoogleOneTap />
              {children}
            </SharedContextProvider>
          </TRPCReactProvider>
          <Toaster />
        </ClerkProvider>
        <SpeedInsights />
        <Analytics />
        <div className="staticBg"></div>
        <div
          className="fixed -right-20 bottom-16 z-50 hidden w-48 sm:block"
          id="hi"
        >
          <TardisNav />
        </div>
      </body>
    </html>
  );
}
