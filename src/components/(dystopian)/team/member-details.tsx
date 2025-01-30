import React, { useContext } from "react";
import BgImg from "public/images/background-teams.png";
import { type TeamData } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import { Share_Tech } from "next/font/google";
import PixelEmail from "@/components/svg/mail";
import PixelInsta from "@/components/svg/insta";
import PixelPhone from "@/components/svg/phone";
import PixelLinkedin from "@/components/svg/linkedin";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface Props {
  data?: TeamData;
}

const MemberDetails = ({ data }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="z-0 flex h-full w-full flex-col items-start justify-start bg-neutral-900 p-5 md:p-12">
      <Image
        src={BgImg}
        width={1920}
        height={1080}
        alt={data?.org ?? "Background image"}
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
        <div className="flex flex-wrap items-baseline gap-2.5 uppercase">
          <span className="mr-5 text-6xl font-bold sm:text-7xl md:text-6xl lg:text-8xl">
            {data?.name ?? "unknown player"}
          </span>
          <span className="rounded-full bg-neutral-600 px-4 text-lg font-light uppercase">
            {data?.role ?? "anonymous"}
          </span>
          <span className="rounded-full bg-neutral-600 px-4 text-lg font-light uppercase">
            {data ? (data.org ?? "admin") : "mystery"} team
          </span>
        </div>
        <div>
          <p
            className={`py-5 text-lg tracking-tight text-amber-50 ${shareTech.className} max-w-screen-sm`}
          >
            {data?.desc ?? "No details provided for selected player."}
          </p>
        </div>
        <div className="mb-5 h-[2px] w-full bg-amber-50/[0.5] backdrop-blur-2xl"></div>
        <div className="flex flex-wrap justify-end gap-8">
          <PixelPhone size={32} color={"#fffbeb"} />
          <PixelInsta size={32} color={"#fffbeb"} />
          <PixelEmail size={32} color={"#fffbeb"} />
          <PixelLinkedin size={32} color={"#fffbeb"} />
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
