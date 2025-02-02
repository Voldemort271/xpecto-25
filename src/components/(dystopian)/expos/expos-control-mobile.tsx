
import React, { type Dispatch, type SetStateAction, useContext } from "react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { motion } from "motion/react";
import { Share_Tech } from "next/font/google";
import { CursorContext } from "@/context/cursor-context";
import { type ExpoWithDetails} from "@/app/types";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface Props {
  expos: ExpoWithDetails;

  index: number;
  length: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const ExposControlMobile = ({ expos }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <>
      <div className="flex h-12 flex-col justify-center overflow-clip border-2 border-b-0 bg-neutral-900 text-2xl font-light uppercase text-amber-50 md:hidden">
        <MarqueeContainer
          text={[
            "more details",
            expos.exposDetails.name,
            "xpecto '25",
            "more details",
            expos.exposDetails.name,
            "xpecto '25",
          ]}
        />
      </div>
      <div className="flex w-full flex-col gap-5 overflow-clip border-2 border-amber-50 bg-neutral-950/[0.5] px-5 py-12 backdrop-blur-2xl md:hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="whitespace-nowrap"
        >
          <div className={`${sharetech.className} text-xl tracking-tight`}>
            Featuring
          </div>
          <div className="text-3xl font-normal uppercase">
            {expos.exposDetails.name}
          </div>
        </motion.div>
        <div className="h-[2px] w-full max-w-16 bg-amber-50"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="whitespace-nowrap"
        >
          <div className={`${sharetech.className} text-xl tracking-tight`}>
            Date
          </div>
          <div className="text-3xl font-normal uppercase">
            {expos.exposDetails.begin_time.toLocaleDateString()}
          </div>
        </motion.div>
        <div className="h-[2px] w-full max-w-16 bg-amber-50"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="whitespace-nowrap"
        >
          <div className={`${sharetech.className} text-xl tracking-tight`}>
            Time
          </div>
          <div className="text-3xl font-normal uppercase">
            {expos.exposDetails.begin_time.toLocaleTimeString()} -{" "}
            {expos.exposDetails.end_time.toLocaleTimeString()}
          </div>
        </motion.div>
        <div className="h-[2px] w-full max-w-16 bg-amber-50"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="whitespace-nowrap"
        >
          <div className={`${sharetech.className} text-xl tracking-tight`}>
            Venue
          </div>
          <div className="text-3xl font-normal uppercase">
            {expos.exposDetails.venue}
          </div>
        </motion.div>
      </div>
      <div
        className="flex h-12 flex-col justify-center overflow-clip border-2 border-t-0 bg-amber-50/[0.7] text-2xl font-light uppercase text-neutral-900 md:hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MarqueeContainer
          text={[
            "book a seat",
            expos.exposDetails.name,
            "xpecto '25",
            "book a seat",
            expos.exposDetails.name,
            "xpecto '25",
          ]}
        />
      </div>
    </>
  );
};

export default ExposControlMobile;
