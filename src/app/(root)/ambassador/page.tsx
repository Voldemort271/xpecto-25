"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";

const Page = () => {
  const { CurrentUser } = useCurrentUser();
  const router = useRouter();

  const createAmbassador = api.ambassador.acceptAmbassadorInvite.useMutation();

  const handleSubmit = () => {
    if (!CurrentUser) {
      return;
    }
    const token =
      CurrentUser?.name.slice(0, 4) +
      CurrentUser?.id.slice(-4) +
      Math.floor(parseFloat(Math.random().toPrecision(3)) * 1000);
    createAmbassador.mutate(
      { userId: CurrentUser?.id ?? "", token: token },
      {
        onSuccess: () => {
          router.push("/profile");
        },
      },
    );
  };
  return (
    <div>
      <div className="h-32"></div>
      {CurrentUser &&
        CurrentUser.clerkId !== "" &&
        CurrentUser.role !== "ambassador" && (
          <div>
            Put the content of campus ambassador here. Content guys job. Also
            put how its mostly resposibility of ambassador to make the user
            write its code
            <button className="border-2 p-2" onClick={handleSubmit}>
              Click here to become a campus ambassador
            </button>
          </div>
        )}
    </div>
  );
};

export default Page;
