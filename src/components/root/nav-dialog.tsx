import React from "react";
import { motion } from "motion/react";
import { Inter } from "next/font/google";

interface Props {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

const inter = Inter({ subsets: ["latin"] });

const handleSubmit = (e: FormData) => {
  console.log(e);
};

const NavDialog = ({ toggle, setToggle }: Props) => {
  return (
    <motion.div
      className={`w-full min-w-[400px] max-w-[600px] rounded-lg border bg-neutral-900 ${inter.className} `}
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 100 }}
    >
      <div className="relative flex w-full flex-row items-center justify-start gap-2.5 rounded-t-lg bg-slate-300 p-2.5 shadow-md shadow-neutral-900/[0.2]">
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
      <div className="flex h-full max-h-96 flex-col gap-5 overflow-scroll rounded-b-lg bg-slate-200 p-5">
        <div className="px-5 text-sm font-medium text-slate-500">
          Welcome. This wizard will walk you through our experimental time
          travel technology. Please select the appropriate options and submit to
          warp to your destination. Brought to you by Xpecto &apos;25.
        </div>
        hi
        <form action={handleSubmit}>
          <input type="text" name="data" id="na" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </motion.div>
  );
};

export default NavDialog;
