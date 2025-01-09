"use client";
import React, { useEffect } from "react";

import { toast } from "sonner";

const TestPage = () => {
  useEffect(() => {
    toast.error("Oh no" as const);
  }, []);
  return <div>test</div>;
};

export default TestPage;
