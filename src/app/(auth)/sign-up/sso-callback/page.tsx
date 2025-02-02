import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
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
