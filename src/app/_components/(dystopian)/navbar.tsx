"use client"

import React, { useContext } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { SharedContext } from "@/lib/context";
import { UserButton } from "@clerk/nextjs";

const DystopianNav = () => {
  const context = useContext(SharedContext);
  if (!context) {
    throw new Error(
      "SharedContext must be used within a SharedContextProvider in home page",
    );
  }
  const { CurrentUser } = context;

  return (
    <div className={styles.navContainer}>
      <div className={styles.brandContainer}>
        <div className="text-5xl font-medium uppercase">xpecto &apos;25</div>
        <div className="text-base font-normal uppercase leading-5">
          indian institute of technology, mandi
        </div>
      </div>
      <div className="h-full border-x-2 border-amber-50"></div>
      <div className={styles.logoContainer}>
        <div className="flex w-full flex-col items-center justify-center bg-amber-50 text-neutral-900">
          {CurrentUser?.id !== "" ? (
            <UserButton />
          ) : (
            <Link href={"/sign-in"}>
              <div className="text-4xl font-medium uppercase">Login</div>
            </Link>
          )}
          <div className="text-base font-normal uppercase">
            to be cool i guess
          </div>
        </div>
      </div>
    </div>
  );
};

export default DystopianNav;
