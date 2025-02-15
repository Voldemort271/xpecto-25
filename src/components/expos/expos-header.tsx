"use client";

import React from "react";
import MarqueeContainer from "@/components/common/marquee-container";
import Image from "next/image";
import { motion } from "motion/react";

const ExposHeader = () => {
  return (
    <div className="relative flex h-full w-full flex-row gap-0 bg-neutral-900">
      <Image
        src={`https://res.cloudinary.com/diqdg481x/image/upload/v1737737277/background_eqguit.jpg`} // Changed the source of the background image
        width={300}
        height={300} // Added sample width and height coz it was giving an error
        alt={"Background img"}
        className="absolute left-0 top-0 h-full w-full object-cover object-center opacity-50"
      />
      <motion.div
        className="absolute left-0 top-[126px] flex h-16 w-screen flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase md:top-0 md:w-[100vh] md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:-rotate-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MarqueeContainer
          text={[
            "Expos",
            "xpecto '25",
            "iit mandi",
            "Expos",
            "xpecto '25",
            "iit mandi",
            "Expos",
            "xpecto '25",
            "iit mandi",
          ]}
        />
      </motion.div>
    </div>
  );
};

export default ExposHeader;
// "use client";

// import React from "react";
// import MarqueeContainer from "@/components/common/marquee-container";
// import { motion } from "motion/react";

// const ExposHeader = () => {
//   return (
//     <div className="h-full w-full bg-neutral-900">
//       <motion.div
//         className="absolute left-0 top-[126px] z-30 flex h-16 w-screen flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase md:top-0 md:w-[100vh] md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:-rotate-90"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <MarqueeContainer
//           text={[
//             "Expos",
//             "xpecto '25",
//             "iit mandi",
//             "Expos",
//             "xpecto '25",
//             "iit mandi",
//             "Expos",
//             "xpecto '25",
//             "iit mandi",
//           ]}
//         />
//       </motion.div>
//     </div>
//   );
// };

// export default ExposHeader;
