import React from "react";
import AuthNavbar from "@/components/(auth)/navbar";
import Image from "next/image";
import SigninPic from "public/signin.jpg";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative z-0 min-h-screen w-screen overflow-clip border-2 border-amber-50 bg-neutral-900">
      <div className="absolute left-0 top-0 z-10 w-screen">
        <AuthNavbar />
      </div>
      <div className="h-28 w-full"></div>
      <Image
        src={SigninPic}
        alt={"Sign in background"}
        className="absolute left-0 top-0 -z-10 h-screen w-screen object-cover opacity-10"
      />
      {children}
      <div className="absolute bottom-0 left-0 flex h-16 w-full flex-col justify-center border-t-2 border-amber-50 bg-neutral-900 text-4xl font-normal uppercase text-amber-50"></div>
    </div>
  );
};

export default AuthLayout;
