"use client"

import { AuthenticateWithRedirectCallback, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SSOCallback() {
  const router = useRouter();
  
    const user = useUser();
    if (user.isSignedIn) {
      router.push("/");
      return <div>Already signed in</div>
    }
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom OAuth flow.
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5">
      <div id="clerk-captcha" className="mt-5"></div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
