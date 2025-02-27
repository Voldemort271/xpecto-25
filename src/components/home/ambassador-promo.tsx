"use client";

import React, { useContext } from "react";
import { Share_Tech } from "next/font/google";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import StaggeredText from "@/components/home/staggered-text";
import { useCurrentUser } from "@/lib/utils";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const AmbassadorPromo = ({ onClick }: { onClick?: () => void }) => {
  const { setIsHovered } = useContext(CursorContext);
  const { CurrentUser } = useCurrentUser();

  return (
    <div className="w-full space-y-2.5 px-5 py-36 text-neutral-900 sm:px-12">
      <div className="block max-w-screen-lg text-5xl font-bold uppercase sm:text-7xl md:hidden">
        become a campus ambassador
      </div>
      <div className="hidden md:block">
        <StaggeredText>become a campus ambassador</StaggeredText>
      </div>
      <div
        className={`${shareTech.className} max-w-screen-lg pb-5 text-lg font-bold tracking-tight`}
      >
        The Campus Ambassador (CA) Program offers you a great opportunity to
        represent Xpecto at your college, ensuring maximum participation while
        gaining invaluable leadership and event management experience. The
        program comes with exclusive perks — get special access to premium
        events, build a network with industry experts, and earn certificates
        that add weight to your professional profile. Join the Xpecto Campus
        Ambassador Program today!
      </div>
      {onClick ? (
        <div
          className="w-fit cursor-none border-2 border-amber-50 bg-neutral-950/[0.9] px-5 py-2 text-2xl font-normal uppercase text-amber-50 backdrop-blur-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
        >
          Become an ambassador
        </div>
      ) : (
        <Link
          href={
            CurrentUser && CurrentUser.id !== "" ? "/ambassador" : "/sign-up"
          }
          className="w-fit cursor-none border-2 border-amber-50 bg-neutral-950/[0.9] px-5 py-2 text-2xl font-normal uppercase text-amber-50 backdrop-blur-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Become an ambassador
        </Link>
      )}
    </div>
  );
};

export default AmbassadorPromo;
