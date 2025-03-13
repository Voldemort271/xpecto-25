import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Share_Tech } from "next/font/google";
import sizeChart from "public/images/size_chart.jpeg";
import Image from "next/image";
import { CursorContext } from "@/context/cursor-context";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const SizeChart = () => {
    const { setIsHovered } = useContext(CursorContext);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
          className={`${shareTech.className} absolute right-9 top-6 flex items-center gap-1 rounded-md border border-amber-50/30 bg-amber-50/10 px-2 py-1 text-sm font-medium text-amber-50 transition-all duration-200 hover:bg-amber-50/20 sm:right-12 lg:right-12`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          Size Chart
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl border border-amber-50/20 bg-neutral-900/95 shadow-2xl">
        <DialogHeader>
          <DialogTitle
            className={`${shareTech.className} text-2xl font-bold tracking-wide text-amber-50`}
          >
            Size Chart
          </DialogTitle>
          <DialogDescription
            className={`${shareTech.className} text-amber-100/70`}
          >
            Find your perfect fit with our comprehensive size chart.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 overflow-hidden rounded-lg border border-amber-50/10">
          <Image
            src={sizeChart}
            width={800}
            height={600}
            alt="Size Chart"
            className="w-full"
          />
        </div>

        <div
          className={` ${shareTech.className} mt-4 space-y-4 text-amber-50/80`}
        >
          Please measure yourself carefully before selecting a size
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeChart;
