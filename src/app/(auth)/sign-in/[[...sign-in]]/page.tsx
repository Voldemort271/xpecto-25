"use client";

import { SignIn, useSignIn } from "@clerk/nextjs";
import React from "react";
import type { OAuthStrategy } from "@clerk/types";

const Signin = () => {
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
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <SignIn />
      <button onClick={() => signInWith("oauth_google")}>
        Sign in with Google
      </button>
      <button onClick={() => signInWith("oauth_github")}>
        Sign in with GitHub
      </button>
    </main>
  );
};

export default Signin;
