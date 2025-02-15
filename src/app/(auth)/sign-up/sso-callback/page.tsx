"use client";

import { AuthenticateWithRedirectCallback, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SSOCallback() {
  const router = useRouter();

  const user = useUser();
  useEffect(() => {
    if (user.isSignedIn) {
      router.push("/");
    }
  }, [user.isSignedIn, router]);

  if (user.isSignedIn) {
    return <div>Already signed in</div>;
  }
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom OAuth flow.
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div id="clerk-captcha" className="mt-5"></div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
