"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import SectionHeader from "@/components/common/section-header";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import { CursorContext } from "@/context/cursor-context";

const Page = () => {
  const { CurrentUser } = useCurrentUser();
  const router = useRouter();
  const { setIsHovered } = useContext(CursorContext);

  const createAmbassador = api.ambassador.acceptAmbassadorInvite.useMutation();

  const handleSubmit = () => {
    if (!(CurrentUser && CurrentUser.id !== "")) {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            You need to have an account to become a campus ambassador.
          </CustomToast>
        ),
        { position: "top-center" },
      );
      router.push("/sign-in");
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
      <SectionHeader title={"Campus Ambassador"}>
        promote our fest and get exciting perks
      </SectionHeader>
      <div className="p-12">
        {CurrentUser && CurrentUser.role !== "ambassador" ? (
          <button
            className="w-full cursor-none bg-green-400/[0.1] px-12 py-5 text-center text-xl font-normal uppercase text-emerald-300 transition-all hover:bg-green-400/[0.3]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleSubmit}
          >
            Click here to become a campus ambassador
          </button>
        ) : (
          <div className="w-full bg-green-400/[0.1] px-12 py-5 text-center text-xl font-normal uppercase text-emerald-300">
            You are already a campus ambassador.
          </div>
        )}
      </div>
      Put the content of campus ambassador here. Content guys job. Also put how
      its mostly resposibility of ambassador to make the user write its code
    </div>
  );
};

export default Page;
