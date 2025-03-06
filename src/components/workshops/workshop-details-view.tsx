"use client";

import React, { useContext } from "react";
import BgImg from "../../../public/images/background-teams.png";
import { WorkshopWithDetails } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import { Share_Tech } from "next/font/google";
import { motion } from "motion/react";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const keyframes = {
  flicker: {
    opacity: [0, 1, 0.3, 0.0, 0.3, 1, 0.3, 0, 0.3, 1, 0.3, 1],
  },
};

interface Props {
  data?: WorkshopWithDetails;
}

const WorkshopDetailsView = ({ data }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="z-0 flex h-full w-full flex-col items-start justify-start bg-neutral-900 p-5 md:p-12">
      <Image
        src={BgImg}
        width={1920}
        height={1080}
        alt={data?.workshopDetails.name ?? "Background image"}
        className="absolute left-0 top-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-tl from-neutral-950/[0.7] to-transparent"></div>
      <div className="py-5">
        <Link
          href={"/"}
          className="cursor-none text-lg font-light uppercase text-amber-50/[0.7]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          &lt;&lt; back to launchpad
        </Link>
        <motion.div
          className="flex flex-wrap items-baseline gap-2.5 uppercase py-4"
          variants={keyframes}
          animate="flicker"
          transition={{
            duration: 0.5,
            ease: "linear",
          }}
        >
          {data?.workshopDetails.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-600 px-4 text-lg font-light uppercase"
            >
              {tag}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="flex flex-wrap items-baseline gap-2.5 uppercase"
          variants={keyframes}
          animate="flicker"
          transition={{
            duration: 0.5,
            ease: "linear",
          }}
        >
          <span className="mr-5 text-6xl font-bold sm:text-7xl md:text-6xl lg:text-8xl">
            {data?.workshopDetails.name ?? "unknown event"}
          </span>
        </motion.div>
        <motion.div
          className={`py-5 text-lg tracking-tight text-amber-50 ${shareTech.className} max-w-screen-sm`}
          variants={keyframes}
          animate="flicker"
          transition={{
            duration: 0.5,
            ease: "linear",
            delay: 0.25,
          }}
        >
          {data?.workshopDetails.description ??
            "No details provided for selected player."}
        </motion.div>
        <div className="mb-5 h-[2px] w-full bg-amber-50/[0.5] backdrop-blur-2xl"></div>
        <motion.div
          className="flex flex-wrap justify-end gap-8"
          variants={keyframes}
          animate="flicker"
          transition={{
            duration: 0.5,
            ease: "linear",
            delay: 0.5,
          }}
        >
          <Link
            href={`/workshops/${data?.workshopDetails.slug}`}
            className="cursor-none border-2 border-amber-50 bg-amber-50/[0.5] px-5 py-1 text-2xl font-normal uppercase text-neutral-900"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            view more details
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkshopDetailsView;
// "use client";

// import React, { useContext } from "react";
// import BgImg from "../../../public/images/background-teams.png";
// import { WorkshopWithDetails } from "@/app/types";
// import Image from "next/image";
// import Link from "next/link";
// import { CursorContext } from "@/context/cursor-context";
// import { Share_Tech } from "next/font/google";
// import { motion } from "motion/react";

// const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

// const keyframes = {
//   flicker: {
//     opacity: [0, 1, 0.3, 0.0, 0.3, 1, 0.3, 0, 0.3, 1, 0.3, 1],
//   },
// };

// interface Props {
//   data?: WorkshopWithDetails;
// }

// const WorkshopDetailsView = ({ data }: Props) => {
//   const { setIsHovered } = useContext(CursorContext);

//   return (
//     <div className="z-0 flex h-full w-full flex-col items-start justify-start bg-neutral-900 p-5 md:p-12">
//       <Image
//         src={BgImg}
//         width={1920}
//         height={1080}
//         alt={data?.workshopDetails.name ?? "Background image"}
//         className="absolute left-0 top-0 -z-20 h-full w-full object-cover object-center"
//       />
//       <div className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-tl from-neutral-950/[0.7] to-transparent"></div>
//       <div className="py-5">
//         <Link
//           href={"/"}
//           className="cursor-none text-lg font-light uppercase text-amber-50/[0.7]"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           &lt;&lt; back to launchpad
//         </Link>
//         <motion.div
//           className="flex flex-wrap items-baseline gap-2.5 uppercase"
//           variants={keyframes}
//           animate="flicker"
//           transition={{
//             duration: 0.5,
//             ease: "linear",
//           }}
//         >
//           <span className="mr-5 text-6xl font-bold sm:text-7xl md:text-6xl lg:text-8xl">
//             {data?.workshopDetails.name ?? "unknown event"}
//           </span>
//           {data?.workshopDetails.tags.map((tag) => (
//             <span
//               key={tag}
//               className="rounded-full bg-neutral-600 px-4 text-lg font-light uppercase"
//             >
//               {tag}
//             </span>
//           ))}
//         </motion.div>
//         <motion.div
//           className={`py-5 text-lg tracking-tight text-amber-50 ${shareTech.className} max-w-screen-sm`}
//           variants={keyframes}
//           animate="flicker"
//           transition={{
//             duration: 0.5,
//             ease: "linear",
//             delay: 0.25,
//           }}
//         >
//           {data?.workshopDetails.description ??
//             "No details provided for selected player."}
//         </motion.div>
//         <div className="mb-5 h-[2px] w-full bg-amber-50/[0.5] backdrop-blur-2xl"></div>
//         <motion.div
//           className="flex flex-wrap justify-end gap-8"
//           variants={keyframes}
//           animate="flicker"
//           transition={{
//             duration: 0.5,
//             ease: "linear",
//             delay: 0.5,
//           }}
//         >
//           <Link
//             href={`/workshops/${data?.workshopDetails.slug}`}
//             className="cursor-none border-2 border-amber-50 bg-amber-50/[0.5] px-5 py-1 text-2xl font-normal uppercase text-neutral-900"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             view more details
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default WorkshopDetailsView;
