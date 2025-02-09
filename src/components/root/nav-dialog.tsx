"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { navElements } from "@/lib/utils";
import CustomToast from "@/components/root/custom-toast";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

const inter = Inter({ subsets: ["latin"] });

const NavDialog = ({ toggle, setToggle }: Props) => {
  const router = useRouter();
  const [override, setOverride] = useState(false);

  const handleWarp = (location: string) => {
    toast.custom(
      (t) => (
        <CustomToast variant="warning" metadata={t}>
          {override
            ? "Proceeding to auth screen. Please standby."
            : `Warping to ${location}. Please standby.`}
        </CustomToast>
      ),
      { duration: 1000, position: "top-right" },
    );
    setTimeout(() => {
      router.push(location);
      setToggle(!toggle);
    }, 10);
    setOverride(false);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -200, right: 0, top: -200, bottom: 0 }}
      whileTap={{ scale: 1.01 }}
      className={`w-full min-w-[400px] max-w-[600px] rounded-lg border bg-neutral-900 ${inter.className} `}
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 100 }}
    >
      <div className="relative flex w-full cursor-grab flex-row items-center justify-start gap-2.5 rounded-t-lg bg-slate-300 p-2.5 shadow-md shadow-neutral-900/[0.2]">
        <div
          className="h-4 w-4 cursor-pointer rounded-full border border-red-600 bg-red-500 shadow-md shadow-neutral-900/[0.2]"
          onClick={() => setToggle(!toggle)}
        ></div>
        <div className="h-4 w-4 rounded-full border border-yellow-500 bg-yellow-500 shadow-md shadow-neutral-900/[0.2]"></div>
        <div className="h-4 w-4 rounded-full border border-emerald-500 bg-emerald-500 shadow-md shadow-neutral-900/[0.2]"></div>
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-slate-700`}
        >
          Time Machine Interface
        </div>
      </div>
      <div className="flex h-full max-h-[400px] flex-col gap-5 overflow-scroll rounded-b-lg bg-slate-200 p-5">
        <div className="px-5 text-sm font-medium text-slate-500">
          Welcome. This wizard will walk you through our experimental time
          travel technology. Please select the appropriate options and submit to
          warp to your destination. Brought to you by Xpecto &apos;25.
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="name" className="text-slate-700">
              Name
            </Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter name of subject"
              className="border-slate-300 bg-slate-100 transition-all focus:border-2 focus:border-blue-400"
            />
          </div>
          <div className="mb-2 text-right text-xs font-medium text-slate-600">
            You can also travel anonymously.
          </div>
          <div className="flex items-start gap-2">
            <div className="w-32 shrink-0 text-sm font-medium text-slate-700">
              Select destination
            </div>
            <div className="grid w-full grid-cols-2 gap-1">
              {navElements.map((el, i) => (
                <div
                  onClick={() =>
                    handleWarp(`/${el !== "Home" ? el.toLowerCase() : ""}`)
                  }
                  key={i}
                  className={
                    override
                      ? "cursor-not-allowed text-sm font-medium text-slate-500"
                      : "cursor-pointer text-sm font-medium text-slate-800 underline hover:text-slate-600"
                  }
                >
                  {el}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-start gap-2">
            <div
              onClick={() => {
                setOverride(true);
                handleWarp("/sign-in");
              }}
              className={
                override
                  ? "cursor-pointer text-sm font-medium text-red-600"
                  : "cursor-pointer text-sm font-medium text-slate-700 hover:underline"
              }
            >
              &gt;&gt; Login
            </div>
          </div>
          <div className="-mt-1 mb-2 text-left text-xs font-medium text-slate-400">
            Clicking this option will take you to the authorization screen.
            Proceed with caution.
          </div>
          <Link
            href={"/team"}
            onClick={() => setToggle(false)}
            className="self-end text-sm text-indigo-500 underline"
          >
            View credits
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NavDialog;
