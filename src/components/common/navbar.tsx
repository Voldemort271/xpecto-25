"use client";

import React, { useContext, useState, useEffect } from "react";
import styles from "@/styles/navbar.module.css";
import NavMobile from "@/components/common/nav-mobile";
import { useCurrentUser } from "@/lib/utils";
import MarqueeContainer from "@/components/common/marquee-container";
import { CursorContext } from "@/context/cursor-context";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/common/searchbar";
import Link from "next/link";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import { Share_Tech } from "next/font/google";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const DystopianNav = () => {
  const [toggle, setToggle] = useState(false);
  const [isPromptDismissed, setIsPromptDismissed] = useState(false);
  const { CurrentUser, isLoading } = useCurrentUser();
  const { setIsHovered } = useContext(CursorContext);
  const path = usePathname();
  const animationDelay = 0;

  const loggedInUserId = CurrentUser?.id ?? "";

  useEffect(() => {
    if (path === "/") {
      setIsPromptDismissed(false);
    }

    if (
      path === "/" &&
      CurrentUser &&
      CurrentUser.id !== "" &&
      !CurrentUser.contact &&
      !isPromptDismissed
    ) {
      toast.custom(
        (t) => (
          <CustomToast variant="info" metadata={t}>
            <div className="flex items-center justify-between p-1.5">
              <Link
                href="/profile"
                className="flex-1 text-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className={`${sharetech.className} text-amber-50 text-base uppercase`}>
                  Complete the setup of your profile!
                </span>
              </Link>
            </div>
          </CustomToast>
        ),
        {
          id: "phoneNumberPrompt",
          duration: Infinity,
          position: "top-center",
        }
      );
    }
  }, [path, CurrentUser, isPromptDismissed, setIsHovered]); // Added setIsHovered

  return (
    <motion.div
      className={styles.navContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className={styles.brandContainer}
        initial={{ translateY: -100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: animationDelay + 0.25 }}
      >
        <Link
          href="/"
          className="cursor-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="text-4xl font-medium uppercase">xpecto &apos;25</div>
          <div className="text-sm font-normal uppercase leading-5">
            indian institute of technology, mandi
          </div>
        </Link>
      </motion.div>

      <div className="hidden h-full w-full grid-cols-6 grid-rows-2 sm:grid">
        <div className="col-span-6 flex h-full w-full">
          {isLoading ? (
            <motion.div
              className={`relative z-10 flex h-full w-full items-center justify-center overflow-clip border-2 border-l-0 border-amber-50 bg-neutral-900 text-4xl font-normal uppercase text-amber-50/[0.5]`}
              initial={{ translateY: -100 }}
              animate={{ translateY: 0 }}
              transition={{
                duration: 0.5,
                delay: animationDelay + 0.5,
                ease: "linear",
              }}
            >
              <MarqueeContainer
                text={[
                  "fetching profile",
                  "please wait",
                  "fetching profile",
                  "please wait",
                  "fetching profile",
                  "please wait",
                ]}
              />
            </motion.div>
          ) : CurrentUser && CurrentUser.id !== "" ? (
            <>
              <motion.div
                className={`relative z-10 flex h-full w-full items-center justify-center overflow-clip border-2 border-l-0 border-amber-50 bg-neutral-900 text-4xl font-normal uppercase text-amber-50/[0.5]`}
                initial={{ translateY: -100 }}
                animate={{ translateY: 0 }}
                transition={{
                  duration: 0.5,
                  delay: animationDelay + 0.5,
                  ease: "linear",
                }}
              >
                <MarqueeContainer
                  text={[
                    "welcome back",
                    CurrentUser.name ?? "unknown user",
                    "enjoy your xperience",
                    CurrentUser.name ?? "unknown user",
                  ]}
                />
              </motion.div>
              <Link
                href={`/profile`}
                className="flex h-full cursor-none items-center justify-center bg-amber-50 px-12 text-4xl font-normal uppercase text-neutral-900"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                profile
              </Link>
            </>
          ) : (
            <>
              <motion.div
                className={`relative z-10 flex h-full w-full items-center justify-center overflow-clip border-2 border-l-0 border-amber-50 bg-neutral-900 text-4xl font-normal uppercase text-amber-50/[0.5]`}
                initial={{ translateY: -100 }}
                animate={{ translateY: 0 }}
                transition={{
                  duration: 0.5,
                  delay: animationDelay + 0.5,
                  ease: "linear",
                }}
              >
                <MarqueeContainer
                  text={[
                    "login to be cool",
                    "cool stuff i promise",
                    "please trust me",
                    "login to xperience xpecto",
                  ]}
                />
              </motion.div>
              <Link
                href={`/sign-up`}
                className="flex h-full cursor-none items-center justify-center bg-amber-50 px-12 text-4xl font-normal uppercase text-neutral-900"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                login
              </Link>
            </>
          )}
        </div>
        {(path.includes("/competitions") ||
          path.includes("/expos") ||
          path.includes("/pronites") ||
          path.includes("/workshops")) && (
          <div className="searchBar relative col-span-6">
            <SearchBar userId={loggedInUserId} />
          </div>
        )}
      </div>
      <motion.div
        className="flex h-full cursor-none flex-col items-end justify-center bg-amber-50 p-5 text-4xl font-bold uppercase text-neutral-900 sm:hidden"
        onClick={() => setToggle(!toggle)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ translateX: -1024 }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.5, delay: animationDelay + 0.5 }}
      >
        {toggle ? (
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
        ) : (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M22 11H23V13H22V14H2V13H1V11H2V10H22V11Z"
              fill="#171717"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M22 19H23V21H22V22H2V21H1V19H2V18H22V19Z"
              fill="#171717"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M23 3V5H22V6H2V5H1V3H2V2H22V3H23Z"
              fill="#171717"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>
        )}
      </motion.div>
      <NavMobile toggler={toggle} setToggler={setToggle} />
    </motion.div>
  );
};

export default DystopianNav;
