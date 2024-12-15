"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import MarqueeContainer from "@/app/_components/(dystopian)/marquee-container";
import { navElements, useCurrentUser } from "@/lib/utils";

interface Props {
  toggler: boolean;
}

const NavMobile = ({ toggler }: Props) => {
  const { CurrentUser } = useCurrentUser();

  return (
    <AnimatePresence>
      {toggler && (
        <motion.div
          className="fixed top-32 -z-10 block h-[calc(100vh-210px)] w-screen border-x-2 border-amber-50 backdrop-blur-2xl lg:hidden"
          initial={{ left: -100, opacity: 0 }}
          animate={{ left: 0, opacity: 1 }}
          exit={{ left: 100, opacity: 0 }}
        >
          {navElements.map((item, index) => (
            <motion.div
              key={index}
              initial={
                item === "Home" ? { opacity: 0 } : { left: -100, opacity: 0 }
              }
              animate={
                item === "Home" ? { opacity: 1 } : { left: 0, opacity: 1 }
              }
              transition={{ delay: index * (Math.random() / 2) }}
              style={{ top: `${index * 16 * 0.25}rem` }}
              className={`absolute left-0 flex h-16 w-full cursor-none flex-row items-center border-b-2 border-amber-50 bg-neutral-900 text-4xl font-normal uppercase transition-all hover:bg-amber-50 hover:text-neutral-900`}
            >
              <MarqueeContainer
                href={`/${item !== "Home" ? item.toLowerCase() : ""}`}
                text={[item, item, item, item, item, item]}
              />
            </motion.div>
          ))}
          {CurrentUser?.id === "" ? (
            <motion.div
              initial={{ left: -100, opacity: 0 }}
              animate={{ left: 0, opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute left-0 top-96 flex h-20 w-full cursor-none flex-row items-center border-b-2 border-amber-50 bg-amber-50 text-6xl font-normal uppercase text-neutral-900 transition-all hover:bg-neutral-900 hover:text-amber-50"
            >
              <MarqueeContainer
                href="/sign-in"
                text={["login to be cool", "i promise cool stuff"]}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ left: -100, opacity: 0 }}
              animate={{ left: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute left-0 top-96 flex h-16 w-full cursor-none flex-row items-center border-b-2 border-amber-50 bg-amber-50 text-4xl font-normal uppercase text-neutral-900 transition-all hover:bg-neutral-900 hover:text-amber-50"
            >
              <MarqueeContainer
                href="/sign-out"
                text={[
                  "welcome back",
                  CurrentUser?.name ?? "User",
                  "hope you have fun",
                ]}
              />
              {/*<UserButton />*/}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavMobile;
