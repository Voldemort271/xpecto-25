"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sleep } from "@/lib/utils";
import CustomToast from "@/components/root/custom-toast";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

const inter = Inter({ subsets: ["latin"] });

const pageLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Competitions",
    href: "/competitions",
  },
  { name: "Expos", href: "/expos" },
  { name: "Pronites", href: "/pronites" },
  { name: "Workshops", href: "/workshops" },
  { name: "Sponsors", href: "/sponsors" },
];

const NavDialog = ({ toggle, setToggle }: Props) => {
  const router = useRouter();
  const [override, setOverride] = useState(false);

  const handleSubmit = async (e: FormData) => {
    console.log(e);
    if (override) {
      toast.custom(
        (t) => (
          <CustomToast variant="warning" metadata={t}>
            Proceeding to authorization screen. Please standby.
          </CustomToast>
        ),
        { duration: 1000, position: "top-right" },
      );
      router.push("/sign-in");
      setToggle(!toggle);
    } else {
      if (e.get("location")) {
        toast.custom(
          (t) => (
            <CustomToast variant="warning" metadata={t}>
              Warping [{e.get("name") ? e.get("name")?.toString() : "Subject"}]
              to {e.get("location")?.toString()}. Please standby.
            </CustomToast>
          ),
          { duration: 1000, position: "top-right" },
        );
        await sleep(1000);
        router.push(e.get("location")?.toString() ?? "/");
        setToggle(!toggle);
      }
    }
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
        <form className="flex w-full flex-col gap-2" action={handleSubmit}>
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
            <div className="grid w-full grid-cols-2 gap-2">
              {pageLinks.map((el, i) => (
                <div className="flex items-center gap-2" key={i}>
                  <Input
                    type="radio"
                    name="location"
                    value={el.href}
                    id={el.name}
                    className="h-4 w-4 cursor-pointer align-middle"
                    disabled={override}
                  />
                  <Label
                    htmlFor={el.name}
                    className={
                      override
                        ? "cursor-not-allowed text-slate-500"
                        : "cursor-pointer text-slate-800"
                    }
                  >
                    {el.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-start gap-2">
            <Input
              type="checkbox"
              name="override"
              id="override"
              className="h-4 w-4 align-middle"
              checked={override}
              onChange={(e) => setOverride(e.target.checked)}
            />
            <Label
              htmlFor="override"
              className={override ? "text-red-600" : "text-slate-700"}
            >
              Safety protocols: {override ? "Overridden" : "Intact"}
            </Label>
          </div>
          <div className="mb-2 text-left text-xs font-medium text-slate-600">
            Checking this option will take you to the authorization screen.
            Proceed with caution.
          </div>
          <div className="flex w-full justify-between gap-5">
            <div className="space-x-5">
              <Button
                type="reset"
                onClick={() => {
                  setOverride(false);
                  setToggle(false);
                }}
                className="mt-2 w-fit border border-slate-400/[0.5] bg-slate-200 px-5 py-2 text-red-500 hover:bg-slate-300"
              >
                Abort
              </Button>
              <Button
                type="submit"
                className="mt-2 w-fit bg-gradient-to-b from-blue-500 to-blue-600 px-5 py-2 text-amber-50 shadow-md shadow-neutral-900/[0.3]"
              >
                Submit
              </Button>
            </div>
            <Link
              href={"/team"}
              onClick={() => setToggle(false)}
              className="self-end text-sm text-indigo-500 underline"
            >
              View credits
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default NavDialog;
