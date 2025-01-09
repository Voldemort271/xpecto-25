"use client";
import React from "react";

import { toast } from "sonner";
import TestToast from "@/components/toasts/test-toast";

const TestPage = () => {
  return (
    <div
      className="h-screen w-screen cursor-pointer bg-neutral-900 text-2xl"
      onClick={() => {
        toast.custom(
          (t) => <TestToast variant="error">hello world!!</TestToast>,
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
