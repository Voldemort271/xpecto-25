"use client";

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
        <div className="text-4xl font-medium uppercase md:text-5xl">
          xpecto &apos;25
        </div>
        <div className="text-sm font-normal uppercase leading-5 md:text-base">
          indian institute of technology, mandi
        </div>
      </div>
      <div className="hidden h-full border-l-2 border-amber-50 md:block"></div>
      <div className={styles.logoContainer}>
        {CurrentUser?.id !== "" ? (
          <div className="flex w-full flex-col items-center justify-center bg-amber-50 text-neutral-900">
            <UserButton />
          </div>
        ) : (
          <Link
            href={"/sign-in"}
            className="flex w-full flex-col items-center justify-center bg-amber-50 text-neutral-900"
          >
            <div className="flex w-full flex-col items-center justify-center">
              <div className="text-4xl font-medium uppercase">Login</div>
              <div className="text-base font-normal uppercase">
                to be cool i guess
              </div>
            </div>
          </Link>
        )}
      </div>
      <div className="flex h-full flex-col items-end justify-center bg-amber-50 p-5 text-4xl font-bold uppercase text-neutral-900 md:hidden">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 13H16V14H17V15H18V16H19V17H20V18H21V19H22V20H21V21H20V22H19V21H18V20H17V19H16V18H15V17H14V16H13V15H11V16H10V17H9V18H8V19H7V20H6V21H5V22H4V21H3V20H2V19H3V18H4V17H5V16H6V15H7V14H8V13H9V11H8V10H7V9H6V8H5V7H4V6H3V5H2V4H3V3H4V2H5V3H6V4H7V5H8V6H9V7H10V8H11V9H13V8H14V7H15V6H16V5H17V4H18V3H19V2H20V3H21V4H22V5H21V6H20V7H19V8H18V9H17V10H16V11H15V13Z"
            fill="#171717"
          />
        </svg>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22 11H23V13H22V14H2V13H1V11H2V10H22V11Z" fill="#171717" />
          <path d="M22 19H23V21H22V22H2V21H1V19H2V18H22V19Z" fill="#171717" />
          <path d="M23 3V5H22V6H2V5H1V3H2V2H22V3H23Z" fill="#171717" />
        </svg>
      </div>
    </div>
  );
};

export default DystopianNav;
