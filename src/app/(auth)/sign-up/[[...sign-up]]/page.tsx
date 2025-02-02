"use client";

import { useSignIn, useSignUp } from "@clerk/nextjs";
import React, { type FormEvent } from "react";
import type { OAuthStrategy } from "@clerk/types";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import GoogleLogo from "@/components/(auth)/google";
import GithubLogo from "@/components/(auth)/github";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Share_Tech } from "next/font/google";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const SignupPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const [verifying, setVerifying] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const router = useRouter();

  if (!isLoaded && !signUp) return null;
  if (!signIn) return null;

  const signUpWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded && !signUp) return null;

    try {
      if (firstName === ""){
        throw new Error("First Name is required");
      }
      await signUp?.create({ emailAddress: email, firstName: firstName, lastName: lastName});
      await signUp?.prepareEmailAddressVerification();
      setVerifying(true);
    } catch (err) {
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
      const typedErr = err as { errors?: { longMessage: string }[] } | { message: string };
      const errorMessage = (typedErr as { errors?: { longMessage: string }[] }).errors?.[0]?.longMessage ?? (typedErr as { message: string }).message ?? "An error occurred";

      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            {errorMessage}
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );

      // console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  const handleVerification = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded && !signUp) return null;

    try {
      const signUpAttempt = await signUp?.attemptEmailAddressVerification({
        code: code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        router.push("/");
        toast.custom(
          (t) => (
            <CustomToast variant={"success"} metadata={t}>
              Logged in successfully!!
            </CustomToast>
          ),
          {
            position: "top-center",
          },
        );
      } else {
        console.error(signUpAttempt);
      }
    } catch (err) {
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
      const typedErr = err as { errors?: { longMessage: string }[] };
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            {typedErr.errors?.[0]?.longMessage ?? ""}
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
      // console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <main className="relative flex min-w-[800px] flex-col items-center justify-center overflow-clip border-2 border-amber-50/[0.7] bg-neutral-900">
      <div className="relative z-10 flex h-12 w-full items-center overflow-clip border-b-2 border-amber-50/[0.7] bg-neutral-900 text-2xl font-normal uppercase tracking-wider text-amber-50">
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
          onClick={() => signUpWith("oauth_google")}
          className="flex w-full items-center justify-center gap-2.5 bg-amber-50/[0.7] px-5 py-2 text-2xl uppercase transition-all hover:bg-amber-50"
        >
          <GoogleLogo color={"#171717"} width={24} height={24} />
          Sign in with Google
        </button>
        <button
          onClick={() => signUpWith("oauth_github")}
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
      <div id="clerk-captcha" className="mt-5"></div>
      <div className="relative w-full">
        {verifying ? (
          <form
            onSubmit={handleVerification}
            className="flex w-full flex-col items-center justify-center gap-5 pt-5"
          >
            <div className="flex w-full flex-col items-start justify-center px-5 sm:flex-row sm:items-center sm:gap-2.5">
              <Label
                htmlFor="code"
                className="text-2xl font-normal uppercase text-amber-50"
              >
                Enter your verification code
              </Label>
              <Input
                value={code}
                id="code"
                name="code"
                className={`max-w-sm rounded-none border-2 border-amber-50 text-lg text-amber-50 ${sharetech.className} tracking-tight`}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col items-end justify-between sm:flex-row sm:gap-2.5">
              <div
                className={`${sharetech.className} p-5 tracking-tight text-amber-50/[0.5]`}
              >
                The code is valid for 5 minutes. You will be redirected to the
                home page on successful sign in.
              </div>
              <button
                type="submit"
                className="bg-amber-50/[0.7] px-5 py-2.5 text-2xl font-normal uppercase text-neutral-900"
              >
                Verify
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center justify-center gap-5 pt-5"
          >
            <div className="flex w-full flex-col items-start justify-center px-5 sm:flex-row sm:items-center sm:gap-2.5">
              <Label
                htmlFor="firstName"
                className="text-2xl font-normal uppercase text-amber-50"
              >
                First Name
              </Label>
              <Input
                value={firstName}
                id="firstName"
                name="firstName"
                type="text"
                className={`max-w-sm rounded-none border-2 border-amber-50 text-lg text-amber-50 ${sharetech.className} tracking-tight`}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col items-start justify-center px-5 sm:flex-row sm:items-center sm:gap-2.5">
              <Label
                htmlFor="lastName"
                className="text-2xl font-normal uppercase text-amber-50"
              >
                Last Name
              </Label>
              <Input
                value={lastName}
                id="lastName"
                name="lastName"
                type="text"
                className={`max-w-sm rounded-none border-2 border-amber-50 text-lg text-amber-50 ${sharetech.className} tracking-tight`}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col items-start justify-center px-5 sm:flex-row sm:items-center sm:gap-2.5">
              <Label
                htmlFor="email"
                className="text-2xl font-normal uppercase text-amber-50"
              >
                Enter email
              </Label>
              <Input
                value={email}
                id="email"
                name="email"
                type="email"
                className={`max-w-sm rounded-none border-2 border-amber-50 text-lg text-amber-50 ${sharetech.className} tracking-tight`}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col items-end justify-between sm:flex-row sm:gap-2.5">
              <div
                className={`${sharetech.className} p-5 tracking-tight text-amber-50/[0.5]`}
              >
                Preferably use your institute email ID. You will receive a
                verification code to sign in to your account.
              </div>
              <button
                type="submit"
                className="bg-amber-50/[0.7] px-5 py-2.5 text-2xl font-normal uppercase text-neutral-900"
              >
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
      {/*<SignUp/>*/}
    </main>
  );
};

export default SignupPage;
