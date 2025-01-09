"use client";
import React from "react";

import { toast } from "sonner";
import CustomToast from "@/components/custom-toast";

const TestPage = () => {
  return (
    <div
      className="h-screen w-screen cursor-pointer bg-neutral-900 text-2xl"
      onClick={() => {
        toast.custom(
          (t) => <CustomToast metadata={t}>hello world!!</CustomToast>,
          {
            position: "top-center",
          },
        );
      }}
    >
      test
    </div>
  );
};

export default TestPage;
