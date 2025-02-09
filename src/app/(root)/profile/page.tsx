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
        clerkId: "",
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
        className="w-fit cursor-none bg-red-500/[0.1] px-5 py-2 text-xl font-light uppercase text-red-300"
        onClick={() => router.back()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        &lt;&lt; go back
      </div>
      <div className="border-2 border-amber-50/[0.5] bg-neutral-950 p-12 md:min-w-[600px] lg:min-w-[1000px]">
        {CurrentUser && CurrentUser.clerkId !== "" && (
          <div>
            <div className="flex items-center gap-2.5">
              <div className="text-6xl font-medium uppercase">
                {CurrentUser.name}
              </div>
              <div
                className={`text-lg ${sharetech.className} rounded-full bg-neutral-600 px-5 uppercase tracking-tight`}
              >
                {CurrentUser.role}
              </div>
            </div>
            <div className={`${sharetech.className} mb-5 tracking-tight`}>
              <div className="mb-2 text-sm text-neutral-600">
                Account created on {CurrentUser.createdAt.toLocaleDateString()}
              </div>
              <div className="mb-1 text-xl font-medium">
                Institution name: {CurrentUser.college_name}
              </div>
              <div className="mb-1 text-xl font-medium">
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
            <button
              disabled={CurrentUser?.clerkId === ""}
              onClick={handleSignOut}
              className="w-fit cursor-none bg-red-500/[0.1] px-5 py-2 text-2xl font-normal uppercase text-red-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Sign Out
            </button>
            {CurrentUser.role === "ambassador" ? (
              <div>
                <div className="flex justify-center border-2 p-2">
                  Ambassador Token : {ambassador?.token ?? ""}
                </div>
                <div>
                  Current number of participants brought :{" "}
                  {ambassador?.contingents.length}
                </div>
              </div>
            ) : (
              //TODO: Add a leaderboard for ambassadors here which also shows rank and number & list of contingents brought by the current user.
              //TODO: Shift this to home page after it has been redesigned
              <button
                className="border-2 p-2"
                onClick={() => router.push("/ambassador")}
              >
                Register as campus ambassador
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
