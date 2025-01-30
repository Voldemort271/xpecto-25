"use client";

import React, { useContext, useState } from "react";
import { motion } from "motion/react";
import { CursorContext } from "@/context/cursor-context";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const ClickToStart = () => {
  const { setIsHovered } = useContext(CursorContext);
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative mt-5 flex w-full flex-col items-center justify-center">
      <motion.div
        className="w-full px-12 py-5 text-xl font-light"
        initial={{ opacity: 1 }}
        variants={{
          blink: {
            opacity: [1, 0, 1],
          },
        }}
        animate="blink"
        transition={{ duration: 1, repeat: Infinity }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setVisible(true);
          document
            .getElementById("hi")
            ?.animate(
              [
                { transform: "translateX(0)" },
                { transform: "translateX(-20px)" },
                { transform: "translateX(0)" },
                { transform: "translateX(-20px)" },
                { transform: "translateX(0)" },
                { transform: "translateX(-20px)" },
                { transform: "translateX(0)" },
              ],
              {
                duration: 300,
                easing: "ease-out",
              },
            );
        }}
      >
        &lt;&lt; call the time machine &gt;&gt;
      </motion.div>
      <motion.div
        className="block px-12 text-xl font-light sm:hidden"
        initial={{ opacity: 1 }}
        variants={{
          blink: {
            opacity: [1, 0, 1],
          },
        }}
        animate="blink"
        transition={{ duration: 1, repeat: Infinity, delay: 1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={"/team"}>&lt;&lt; view credits &gt;&gt;</Link>
      </motion.div>
      {visible && (
        <div
          className={`fixed left-0 top-0 h-screen w-screen bg-neutral-900/[0.7] p-5 pt-40 ${inter.className} block sm:hidden`}
        >
          <motion.div
            className={`w-full rounded-lg border bg-neutral-900 ${inter.className} normal-case tracking-normal`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative flex w-full flex-row items-center justify-start gap-2.5 rounded-t-lg bg-slate-300 p-2.5 shadow-md shadow-neutral-900/[0.2]">
              <div
                className="h-4 w-4 cursor-pointer rounded-full border border-red-600 bg-red-500 shadow-md shadow-neutral-900/[0.2]"
                onClick={() => setVisible(false)}
              ></div>
              <div className="h-4 w-4 rounded-full border border-yellow-500 bg-yellow-500 shadow-md shadow-neutral-900/[0.2]"></div>
              <div className="h-4 w-4 rounded-full border border-emerald-500 bg-emerald-500 shadow-md shadow-neutral-900/[0.2]"></div>
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-slate-700`}
              >
                Critical Error
              </div>
            </div>
            <div className="flex flex-col gap-5 overflow-scroll rounded-b-lg bg-slate-200 p-5">
              <div className="px-5 text-sm font-medium text-slate-500">
                Dear [Subject], due to usage of extremely volatile technology,
                the time machine is on early access for users with wider
                displays. You can access time machine through a wider screen.{" "}
                <br />
                However, if you need to warp urgently, our proprietary
                navigation is still online.
              </div>
              <Button
                onClick={() => {
                  setVisible(false);
                }}
                className="mt-2 w-fit border border-slate-400/[0.5] bg-slate-200 px-5 py-2 text-red-500 hover:bg-slate-300"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ClickToStart;
