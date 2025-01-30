import React, { useContext } from "react";
import BgImg from "public/images/background-teams.png";
import { type TeamData } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";

interface Props {
  data?: TeamData;
}

const MemberDetails = ({ data }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="z-0 flex h-full w-full flex-col items-start justify-start bg-neutral-900 p-12">
      <Image
        src={BgImg}
        width={1920}
        height={1080}
        alt={data?.org ?? "Background image"}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="py-5">
        <Link
          href={"/"}
          className="cursor-none text-lg font-light uppercase text-amber-50/[0.7]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          &lt;&lt; back to launchpad
        </Link>
      </div>
    </div>
  );
};

export default MemberDetails;
