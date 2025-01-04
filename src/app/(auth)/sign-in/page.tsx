"use client";

import * as React from "react";
import { type OAuthStrategy } from "@clerk/types";
import { useSignIn } from "@clerk/nextjs";

export default function OauthSignIn() {
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  // Render a button for each supported OAuth provider
  // you want to add to your app. This example uses only Google.
  return (
    <div>
      <button onClick={() => signInWith("oauth_google")}>
        Sign in with Google
      </button>
      <button onClick={() => signInWith("oauth_github")}>
        Sign in with GitHub
      </button>
    </div>
  );
}
