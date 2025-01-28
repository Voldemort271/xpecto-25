"use client";
import React, { useContext } from "react";
import { useClerk } from "@clerk/nextjs";
import { SharedContext } from "@/lib/context";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const { signOut } = useClerk();
  const context = useContext(SharedContext);
  const router = useRouter();

  if (!context) {
    throw new Error(
      "SharedContext must be used within a SharedContextProvider in home page",
    );
  }
  const { CurrentUser, setCurrentUser } = context;

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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          transform: "scale(3)",
          display: "inline-block",
          margin: "1rem",
        }}
      >
        <button
          className="border-2 p-2"
          disabled={CurrentUser?.clerkId === ""}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default Page;
