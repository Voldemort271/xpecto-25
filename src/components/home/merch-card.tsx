"use client";

import React from "react";
import merch_1 from "public/images/merch_1.jpeg";
import Image from "next/image";
import { $Enums, type Merch } from "@prisma/client";

const MerchCard = ({ merchImage = merch_1, alt = "Merch pic" }) => {
  const handleClick = () => {
    window.location.href = "/merch";
  };

  return (
    <div
      className="relative z-0 col-span-4 h-full min-h-96 w-full cursor-pointer overflow-clip border border-amber-50 sm:col-span-2 md:col-span-1"
      onClick={handleClick}
    >
      <Image
        src={merchImage}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        quality={100}
        priority
        className="object-cover"
      />
    </div>
  );
};

export default MerchCard;
