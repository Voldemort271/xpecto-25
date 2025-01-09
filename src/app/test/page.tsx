"use client";
import React from "react";

import { toast } from "sonner";
import TestToast from "@/components/toasts/test-toast";

const TestPage = () => {
  return (
    <div
      className="cursor-pointer bg-red-400 text-2xl"
      onClick={() => {
        toast.custom((t) => <TestToast />, { position: "top-center" });
      }}
    >
      test
    </div>
  );
};

export default TestPage;
