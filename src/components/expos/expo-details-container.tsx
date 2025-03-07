"use client";

import React, {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
} from "react";
import { motion } from "motion/react";
import { CursorContext } from "@/context/cursor-context";
import { ExpoWithDetails } from "@/app/types";

interface Props {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  children: ReactNode;
  data: ExpoWithDetails[];
}

const keyframes = {
  flicker: {
    opacity: [0, 1, 0.3, 0.7, 0.3, 1, 0.3, 1, 0.3, 1, 0.3, 1],
  },
};

const ExpoDetailsContainer = ({ index, setIndex, children, data }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="h-full w-full bg-neutral-900 md:pt-16">
      <div className="relative flex h-full w-full flex-col items-start justify-between md:pt-12">
        {children}
        <div className="z-0 grid min-w-72 grid-cols-2 p-2.5 pb-12 sm:p-5">
          <motion.div
            className="col-span-2 text-2xl font-light uppercase text-amber-50"
            variants={keyframes}
            animate="flicker"
            transition={{
              duration: 1,
              ease: "linear",
              repeat: 1,
            }}
          >
            navigate realm
          </motion.div>
          {data
            .slice(
              index < 2 ? index : index - 2,
              index < 2 ? index + 5 : index + 3,
            )
            .map((el, i) => (
              <motion.div
                className="pr-2.5 text-lg font-normal uppercase text-amber-50 transition-all hover:font-light md:font-extralight"
                key={i}
                onClick={() =>
                  setIndex((prev) => (prev < 2 ? prev + i : prev - 2 + i))
                }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variants={keyframes}
                animate="flicker"
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: 1,
                  delay: 0.5 + i * 0.2,
                }}
              >
                {el.exposDetails.name}
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExpoDetailsContainer;
// "use client";

// import React, {
//   type Dispatch,
//   type ReactNode,
//   type SetStateAction,
//   useContext,
// } from "react";
// import { motion } from "motion/react";
// import { CursorContext } from "@/context/cursor-context";
// import { ExpoWithDetails } from "@/app/types";

// interface Props {
//   index: number;
//   setIndex: Dispatch<SetStateAction<number>>;
//   children: ReactNode;
//   data: ExpoWithDetails[];
// }

// const keyframes = {
//   flicker: {
//     opacity: [0, 1, 0.3, 0.7, 0.3, 1, 0.3, 1, 0.3, 1, 0.3, 1],
//   },
// };

// const WorkshopDetailsContainer = ({
//   index,
//   setIndex,
//   children,
//   data,
// }: Props) => {
//   const { setIsHovered } = useContext(CursorContext);

//   return (
//     <div className="h-full w-full bg-neutral-900 md:pt-16">
//       <div className="relative flex h-full w-full flex-col items-start justify-between md:pt-12">
//         {children}
//         <div className="z-0 grid min-w-72 grid-cols-2 p-2.5 pb-12 sm:p-5">
//           <motion.div
//             className="col-span-2 text-2xl font-light uppercase text-amber-50/[0.8]"
//             variants={keyframes}
//             animate="flicker"
//             transition={{
//               duration: 1,
//               ease: "linear",
//               repeat: 1,
//             }}
//           >
//             navigate realm
//           </motion.div>
//           {data
//             .slice(
//               index < 2 ? index : index - 2,
//               index < 2 ? index + 5 : index + 3,
//             )
//             .map((el, i) => (
//               <motion.div
//                 className="pr-2.5 text-lg font-light uppercase text-amber-50/[0.7] transition-all hover:font-light md:font-extralight"
//                 key={i}
//                 onClick={() =>
//                   setIndex((prev) => (prev < 2 ? prev + i : prev - 2 + i))
//                 }
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 variants={keyframes}
//                 animate="flicker"
//                 transition={{
//                   duration: 1,
//                   ease: "easeInOut",
//                   repeat: 1,
//                   delay: 0.5 + i * 0.2,
//                 }}
//               >
//                 {el.exposDetails.name}
//               </motion.div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkshopDetailsContainer;
