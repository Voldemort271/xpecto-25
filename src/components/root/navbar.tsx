"use client";

import React from "react";
import Image from "next/image";
import Tardis from "public/tardis.png";
import { motion } from "motion/react";

const TardisNav = () => {
  return (
    <motion.div
      initial={{ translateY: 0 }}
      animate={{ translateY: 16 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="cursor-pointer"
    >
      <Image
        src={Tardis}
        alt={"Tardis lol"}
        className="transition-all hover:scale-110"
      />
    </motion.div>
  );
};

export default TardisNav;
