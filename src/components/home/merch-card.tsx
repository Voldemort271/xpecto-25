"use client";

import { motion } from "motion/react";
import React from "react";
import shirt from "public/images/tshirt.jpeg";
import Image from "next/image";
import { $Enums, type Merch } from "@prisma/client";
const MerchCard = () => {
  {
    /* TODO: Allow props in component to account for different merch designs */
  }
  return (
    <div className="relative z-0 col-span-4 h-full min-h-96 w-full overflow-clip border border-amber-50 sm:col-span-2 md:col-span-1">
      {
        <Image
          src={shirt}
          alt={"Merch pic"}
          width={2}
          height={4}
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover opacity-100"
        />
      }
      <motion.div
        className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-start justify-end bg-gradient-to-b from-neutral-950/[0.1] to-neutral-950/[0.7] p-5 text-2xl font-normal uppercase"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        onClick={() => (window.location.href = "\merch")}
      >
        coming soon
      </motion.div>
    </div>
  );
};

export default MerchCard;
