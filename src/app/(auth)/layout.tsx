import React from "react";
import AuthNavbar from "@/components/(auth)/navbar";
import Image from "next/image";
import SigninPic from "public/signin.jpg";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative z-0 min-h-screen w-screen bg-neutral-900">
      <div className="absolute left-0 top-0 z-50 w-screen">
        <AuthNavbar />
      </div>
      <Image
        src={SigninPic}
        alt={"Sign in background"}
        className="absolute left-0 top-0 -z-10 h-screen w-screen object-cover opacity-10"
      />
      {children}
    </div>
  );
};

export default AuthLayout;
