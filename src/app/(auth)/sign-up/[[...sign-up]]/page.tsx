"use client";

import { SignUp, useSignIn } from "@clerk/nextjs";
import React from "react";
import type { OAuthStrategy } from "@clerk/types";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import GoogleLogo from "@/components/(auth)/google";
import GithubLogo from "@/components/(auth)/github";

const SignupPage = () => {
  const { signIn } = useSignIn();
  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <main className="relative flex min-w-[800px] flex-col items-center justify-center overflow-clip border-2 border-amber-50/[0.7] bg-neutral-900">
      <div className="relative z-10 flex h-12 w-full cursor-none items-center overflow-clip border-b-2 border-amber-50/[0.7] bg-neutral-900 text-2xl font-normal uppercase tracking-wider text-amber-50">
        <MarqueeContainer
          text={[
            "register for xpecto '25",
            "register for xpecto '25",
            "register for xpecto '25",
          ]}
          delay={1}
        />
      </div>
      <div className="grid w-full grid-cols-2 gap-5 p-5">
        <button
          onClick={() => signInWith("oauth_google")}
          className="flex w-full items-center justify-center gap-2.5 bg-amber-50/[0.7] px-5 py-2 text-2xl uppercase transition-all hover:bg-amber-50"
        >
          <GoogleLogo color={"#171717"} width={24} height={24} />
          Sign in with Google
        </button>
        <button
          onClick={() => signInWith("oauth_github")}
          className="flex w-full items-center justify-center gap-2.5 bg-amber-50/[0.7] px-5 py-2 text-2xl uppercase transition-all hover:bg-amber-50"
        >
          <GithubLogo color={"#171717"} width={24} height={24} />
          Sign in with GitHub
        </button>
      </div>
      <div className="flex w-full flex-row items-center gap-2.5 px-2.5">
        <div className="h-[2px] w-full bg-amber-50/[0.7]"></div>
        <div className="text-xl font-light uppercase text-amber-50">OR</div>
        <div className="h-[2px] w-full bg-amber-50/[0.7]"></div>
      </div>

      <SignUp />
    </main>
  );
};

export default SignupPage;
