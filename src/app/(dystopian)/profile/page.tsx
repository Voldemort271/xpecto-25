"use client";
import React, { useContext } from "react";
import { useClerk } from "@clerk/nextjs";
import { SharedContext } from "@/lib/context";
import { toast } from "sonner";
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
        toast.error("No user data found");
        router.push("/sign-up");
      }
      if (!setCurrentUser) {
        toast.error("No setter function found");
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
      });
      toast.error("Signed Out Successfully");
    } catch (error) {
      toast.error(`Error signing out`);
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
