"use client";
import React, { useContext } from "react";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Share_Tech } from "next/font/google";
import { CursorContext } from "@/context/cursor-context";
import Link from "next/link";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const Page = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const { setIsHovered } = useContext(CursorContext);

  const { CurrentUser, setCurrentUser } = useCurrentUser();

  const { data: ambassador } = api.ambassador.getAmbassador.useQuery({
    userId: CurrentUser?.id ?? "",
  });

  const handleSignOut = async () => {
    try {
      if (!CurrentUser) {
        // toast.error("No user data found");
        toast.custom(
          (t) => (
            <CustomToast variant={"error"} metadata={t}>
              No user data found
            </CustomToast>
          ),
          {
            position: "top-center",
          },
        );

        router.push("/sign-up");
      }
      if (!setCurrentUser) {
        // toast.error("No setter function found");
        toast.custom(
          (t) => (
            <CustomToast variant={"error"} metadata={t}>
              No setter function found
            </CustomToast>
          ),
          {
            position: "top-center",
          },
        );

        router.push("/");
        return;
      }
      await signOut();
      // Reset the shared context to its default state
      setCurrentUser({
        name: "",
        email: "",
        college_name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "",
        role: "",
        POCId: null,
        accomodation: false,
      });
      // toast.error("Signed Out Successfully");
      toast.custom(
        (t) => (
          <CustomToast variant={"info"} metadata={t}>
            Signed Out Successfully
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
    } catch (error) {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            Error signing out
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
      // toast.error(`Error signing out`);
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className="w-fit cursor-none bg-red-500/[0.1] px-5 py-2 text-xl font-light uppercase text-red-300 backdrop-blur-2xl"
        onClick={() => router.back()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        &lt;&lt; go back
      </div>
      <div className="border-2 border-amber-50/[0.5] bg-neutral-950 p-12 md:min-w-[600px] lg:min-w-[1000px]">
        {CurrentUser && CurrentUser.id !== "" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
              <div className="text-4xl font-medium uppercase sm:text-6xl">
                {CurrentUser.name}
              </div>
              <div
                className={`mb-2.5 w-fit text-lg sm:mb-0 ${sharetech.className} rounded-full bg-neutral-600 px-5 uppercase tracking-tight`}
              >
                {CurrentUser.role}
              </div>
            </div>
            <div className={`${sharetech.className} mb-5 tracking-tight`}>
              <div className="mb-2 text-sm text-neutral-600">
                Account created on {CurrentUser.createdAt.toLocaleDateString()}
              </div>
              <div className="mb-1 text-lg font-medium sm:text-xl">
                Institution: {CurrentUser.college_name}
              </div>
              <div className="mb-1 text-lg font-medium sm:text-xl">
                Email:{" "}
                <Link
                  href={`mailto:${CurrentUser.email}`}
                  target={"_blank"}
                  className="cursor-none underline"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {CurrentUser.email}
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:gap-5">
              <button
                disabled={CurrentUser?.id === ""}
                onClick={handleSignOut}
                className="w-fit cursor-none bg-red-500/[0.1] px-5 py-2 text-xl font-normal uppercase text-red-300 sm:text-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Sign Out
              </button>
              {CurrentUser.role === "ambassador" ? (
            {CurrentUser.role === "ambassador" ? (
              <div className="sm:flex items-start gap-5">
                <div className="space-y-1">
                  <div className="bg-emerald-500/[0.1] px-5 py-2 text-xl font-normal uppercase text-green-300 sm:text-2xl">
                    Ambassador Token: {ambassador?.token ?? "none"}
                  </div>
                  <div
                    className={`text-lg ${sharetech.className} text-2xl font-normal tracking-tight text-amber-200`}
                  >
                    Current score: {ambassador?.contingents.length}
                  </div>
                </div>
                <button
                  className="w-fit cursor-none bg-emerald-500/[0.1] px-5 py-2 text-2xl font-normal uppercase text-green-300"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => router.push("/team/leaderboard")}
                >
                  Leaderboard
                </button>
              </div>
            ) : (
              //TODO: Add a leaderboard for ambassadors here which also shows rank and number & list of contingents brought by the current user.
              //TODO: Shift this to home page after it has been redesigned
              <button
                className="w-fit cursor-none bg-emerald-500/[0.1] px-5 py-2 text-2xl font-normal uppercase text-green-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => router.push("/ambassador")}
              >
                Register as campus ambassador
              </button>
            )}

            <button
              disabled={CurrentUser?.clerkId === ""}
              onClick={handleSignOut}
              className="mt-4 w-fit cursor-none bg-red-500/[0.1] px-5 py-2 text-2xl font-normal uppercase text-red-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div
        className={`flex w-full justify-end gap-2.5 ${sharetech.className} tracking-tight`}
      >
        <div
          className="w-fit cursor-none bg-sky-500/[0.1] px-5 py-1 text-base font-light uppercase text-indigo-300 backdrop-blur-2xl"
          onClick={() => router.push("/legal/terms")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          terms of service
        </div>
        <div
          className="w-fit cursor-none bg-sky-500/[0.1] px-5 py-1 text-base font-light uppercase text-indigo-300 backdrop-blur-2xl"
          onClick={() => router.push("/legal/privacy")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          privacy policy
        </div>
      </div>
    </div>
  );
};
export default Page;
