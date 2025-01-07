import React from "react";
import AuthNavbar from "@/components/(auth)/navbar";
import Image from "next/image";
import SigninPic from "public/signin.jpg";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div
      className={`relative z-0 min-h-screen w-screen overflow-clip border-2 border-amber-50 bg-neutral-900 ${handjet.className} tracking-widest`}
    >
      <div className="absolute left-0 top-0 z-10 w-screen">
        <AuthNavbar />
      </div>
      <div className="h-28 w-full"></div>
      <Image
        src={SigninPic}
        alt={"Sign in background"}
        className="absolute left-0 top-0 -z-10 h-screen w-screen object-cover opacity-20"
      />
      <div className="flex min-h-[calc(100vh-180px)] w-full flex-col items-center justify-center bg-red-400 p-12">
        {children}
      </div>
      <div
        className={`flex h-16 w-full flex-col justify-center border-t-2 border-amber-50 bg-neutral-900 text-4xl font-light uppercase text-amber-50 ${handjet.className} tracking-wider`}
      >
        <MarqueeContainer
          text={[
            "sign up to register for events",
            "sign up to book seats in pronites",
            "sign up to xperience xpecto",
          ]}
          delay={2}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
