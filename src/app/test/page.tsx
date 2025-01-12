"use client";
import React from "react";

import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import XText from "@/components/(dystopian)/home/X";

const TestPage = () => {
  return (
    <div
      className="h-screen w-screen cursor-pointer bg-neutral-900 text-2xl"
      onClick={() => {
        toast.custom(
          (t) => (
            <CustomToast variant={"info"} metadata={t}>
              hello world!!
            </CustomToast>
          ),
          {
            position: "top-center",
          },
        );
      }}
    >
      test
      <XText />
    </div>
  );
};

export default TestPage;
