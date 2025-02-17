"use client";

import React, { useContext } from "react";
import StaggeredText from "@/components/home/staggered-text";
import Image from "next/image";
import StaticImg from "public/images/img.png";
import { Share_Tech } from "next/font/google";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const AboutIITMandi = () => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="relative z-0 flex w-full flex-row justify-center border-t-2 border-amber-50/[0.3] py-24">
      <Image
        src={
          "https://res.cloudinary.com/diqdg481x/image/upload/v1739198119/images/iitmandi.jpg"
        }
        width={1920}
        height={600}
        alt={"College Pic"}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center opacity-20"
      />
      <div className="mx-5 flex flex-col items-center gap-12 md:flex-row">
        <div>
          <StaggeredText>About iit mandi</StaggeredText>
          <div
            className={`mb-5 max-w-screen-sm ${shareTech.className} mt-2 text-base leading-normal tracking-tight lg:text-lg`}
          >
            IIT Mandi, nestled in the serene Kamand Valley of Himachal Pradesh,
            is a hub of innovation and academic excellence set against a
            breathtaking Himalayan backdrop. Our campus seamlessly integrates
            modern infrastructure with nature, providing an environment that
            inspires creativity and intellectual growth.
            <br />
            We&apos;re shaping the future through advanced research in areas
            like artificial intelligence, robotics, and sustainable development.
            Beyond academics, our vibrant student community, cultural diversity,
            and entrepreneurial spirit make it a place where ideas flourish and
            leaders emerge.
          </div>
          <Link
            href={"https://www.iitmandi.ac.in/"}
            target={"_blank"}
            className="w-fit cursor-none border-2 border-amber-50 bg-amber-50/[0.7] px-5 py-1 text-2xl font-normal uppercase text-neutral-900 backdrop-blur-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Visit website
          </Link>
        </div>
        <Image
          src={StaticImg}
          alt={"Placeholder"}
          className="w-[300px] object-cover lg:w-[400px]"
        />
      </div>
    </div>
  );
};

export default AboutIITMandi;
