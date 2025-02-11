"use client";

import React, { useContext } from "react";
import { Share_Tech } from "next/font/google";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import StaggeredText from "@/components/home/staggered-text";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const AmbassadorPromo = () => {
  const { setIsHovered } = useContext(CursorContext);

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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at est
        incidunt ipsum iste labore nulla pariatur quia reiciendis totam! Cum
        doloribus eos possimus temporibus vero voluptate. Dicta, enim, facere.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
        fugiat incidunt ipsa reiciendis sapiente? Dignissimos distinctio earum
        eos, impedit ipsam nobis numquam, possimus provident quam quis sunt
        tenetur ullam, voluptates.
      </div>
      <Link
        href={"/ambassador"}
        className="w-fit cursor-none border-2 border-amber-50 bg-neutral-950/[0.9] px-5 py-2 text-2xl font-normal uppercase text-amber-50 backdrop-blur-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Become an ambassador
      </Link>
    </div>
  );
};

export default AmbassadorPromo;
