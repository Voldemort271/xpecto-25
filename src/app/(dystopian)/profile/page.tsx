"use client";
import React, { useEffect } from "react";
import { api } from "@/trpc/react"; // Import the api object
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
const Page = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          transform: "scale(3)",
          display: "inline-block",
          margin: "1rem",
        }}
      >
        <UserButton />
      </div>
    </div>
  );
  window.location.reload();
};
export default Page;
