"use client";

import { useSignIn } from "@clerk/nextjs";
import React, { type FormEvent } from "react";
import type {
  EmailCodeFactor,
  OAuthStrategy,
  SignInFirstFactor,
} from "@clerk/types";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import GoogleLogo from "@/components/(auth)/google";
import GithubLogo from "@/components/(auth)/github";
import { useRouter } from "next/navigation";
import { Share_Tech } from "next/font/google";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const SigninPage = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [verifying, setVerifying] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const router = useRouter();

  if (!isLoaded && !signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded && !signIn) return null;

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: email,
      });

      const isEmailCodeFactor = (
        factor: SignInFirstFactor,
      ): factor is EmailCodeFactor => {
        return factor.strategy === "email_code";
      };
      const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

      if (emailCodeFactor) {
        const { emailAddressId } = emailCodeFactor;

        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });

        setVerifying(true);
      }
    } catch (err) {
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      toast.error(err.errors[0].longMessage);
      // console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  const handleVerification = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded && !signIn) return null;

    try {
      const signInAttempt = await signIn?.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push("/");
      } else {
        console.error(signInAttempt);
      }
    } catch (err) {
      setCode("");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      toast.error(err.errors[0].longMessage);
      // console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <main className="relative flex max-w-[800px] flex-col items-center justify-center overflow-clip border-2 border-amber-50/[0.7] bg-neutral-900 md:min-w-[800px]">
      <div className="relative z-10 flex h-12 w-full items-center overflow-clip border-b-2 border-amber-50/[0.7] bg-neutral-900 text-2xl font-normal uppercase tracking-wider text-amber-50">
        <MarqueeContainer
          text={[
            "sign in to xpecto '25",
            "sign in to xpecto '25",
            "sign in to xpecto '25",
          ]}
          delay={1}
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-5 p-5 sm:grid-cols-2">
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
      {/*<SignIn />*/}
    </main>
  );
};

export default SigninPage;
