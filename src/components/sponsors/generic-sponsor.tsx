import React, { useContext } from "react";
import { Share_Tech } from "next/font/google";
import Pic1 from "../../../public/images/img.png";
import Image from "next/image";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface Props {
  tier: "gold" | "silver" | "bronze";
  name: string;
  pic?: string;
  link: string;
}

const GenericSponsor = ({ tier, name, pic, link }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="relative z-0 flex h-32 w-full justify-center gap-5">
      <Image
        src={pic ?? Pic1}
        width={128}
        height={128}
        alt={name}
        className="h-32 w-32 object-cover"
      />
      <div className="flex h-full flex-col py-5">
        <div
          className={`${sharetech.className} w-fit rounded-full px-2.5 py-0 text-sm font-normal uppercase tracking-tight ${tier === "gold" ? "bg-yellow-400 text-neutral-900" : tier === "silver" ? "bg-neutral-600 text-amber-50" : "bg-amber-800 text-amber-50"}`}
        >
          {tier}
        </div>
        <Link
          href={link}
          target={"_blank"}
          className="cursor-none text-4xl font-normal uppercase"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {name}
        </Link>
      </div>
    </div>
  );
};

export default GenericSponsor;
