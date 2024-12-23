"use client";

import { profileSidebarElements } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileSidebar = () => {
  const path = usePathname();
  const firstPathItem = path.split("/")[1];
  return (
    <div className="fixed top-32 flex h-full w-48 flex-col items-center border-r-2 border-amber-50 bg-neutral-900 text-amber-50 lg:top-40">
      {profileSidebarElements.map((item, index) => (
        <div
          key={index}
          className={`w-full border-2 p-4 text-center ${item.toLowerCase() === firstPathItem?.toLowerCase() || (item === "Home" && firstPathItem === "") ? "bg-amber-50/[0.7] text-neutral-900" : ""}`}
        >
          <Link href={`/${item.toLowerCase()}`}>{item}</Link>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
