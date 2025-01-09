import React from "react";
import { cva } from "class-variance-authority";
import { Handjet, Share_Tech } from "next/font/google";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { toast } from "sonner";

const handjet = Handjet({ subsets: ["latin"] });
const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface Props {
  variant?: "success" | "info" | "warning" | "error";
  children: React.ReactNode;
  metadata?: number | string;
}

const toastStyles = cva(
  [
    "w-80 bg-neutral-900 border-2 p-0 shadow-2xl shadow-neutral-900",
    sharetech.className,
    "tracking-tight",
  ],
  {
    variants: {
      intent: {
        success: ["border-green-500"],
        info: ["border-blue-300"],
        warning: ["border-yellow-300"],
        error: ["border-red-400"],
      },
    },
    defaultVariants: {
      intent: "info",
    },
  },
);

const TestToast = ({ variant, children, metadata }: Props) => {
  return (
    <div className={toastStyles({ intent: variant })}>
      <div
        className={`relative h-10 w-full border-b text-xl font-light uppercase tracking-widest ${handjet.className} flex flex-col justify-center overflow-clip ${
          variant === "info"
            ? "border-blue-300 text-blue-300"
            : variant === "success"
              ? "border-green-500 text-green-400"
              : variant === "warning"
                ? "border-yellow-300 text-yellow-300"
                : variant === "error"
                  ? "border-red-300 text-red-300"
                  : "border-amber-50 text-amber-50"
        }`}
      >
        <MarqueeContainer
          text={
            variant === "info"
              ? ["important information", "may I have your attention please"]
              : variant === "success"
                ? ["mission accomplished", "yay that's a win"]
                : variant === "warning"
                  ? ["easy there lad", "you have been warned"]
                  : variant === "error"
                    ? ["critical error", "you messed up"]
                    : ["well maybe we messed up", "oh noes"]
          }
        />
      </div>
      <div className="p-2.5 text-amber-50">{children ?? "Generic toast"}</div>
      {metadata && (
        <div className="flex w-full justify-end">
          <div
            className={`flex items-center justify-center bg-blue-300 px-2.5 py-1 text-neutral-900 ${handjet.className} cursor-pointer font-light uppercase tracking-widest`}
            onClick={() => toast.dismiss(metadata)}
          >
            Dismiss
          </div>
        </div>
      )}
    </div>
  );
};

export default TestToast;
