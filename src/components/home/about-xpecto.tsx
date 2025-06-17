import React from "react";
import StaggeredText from "@/components/home/staggered-text";
import Image from "next/image";
import { Share_Tech } from "next/font/google";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const AboutXpecto = () => {
  return (
    <div className="relative z-0 flex w-full flex-row justify-center py-24">
      <Image
        src={
          "https://res.cloudinary.com/djzzlkekc/image/upload/v1742670478/soouaf9mattqymlmkivy_qz0hnd.jpg"
        }
        width={1920}
        height={600}
        alt={"College Pic"}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-bottom opacity-20"
      />
      <div className="mx-5 flex flex-col items-center gap-12 md:flex-row">
        <div>
          <StaggeredText>About xpecto &apos;25</StaggeredText>
          <div
            className={`max-w-screen-sm ${shareTech.className} mt-2 text-base leading-normal tracking-tight lg:text-lg`}
          >
            Xpecto 2025 is the biggest tech fest in the Himalayas and the
            inter-college extravaganza organized by the Science and Technology
            Council of IIT Mandi. From cracking codes to bending timelines to
            exploring space-time portals, Xpecto 2025 invites tech enthusiasts
            to dive into a universe where the boundaries of time, reality, and
            imagination blur. It is a platform for learning, experiencing,
            networking, and generating ideas that transcend timelines.
          </div>
        </div>
        <Image
          src={
            "https://res.cloudinary.com/djzzlkekc/image/upload/v1743684638/Asset_12_lt5nmf_nrqt5h.png"
            // "https://res.cloudinary.com/diqdg481x/image/upload/v1739812760/Asset_12_lt5nmf.png"
          }
          width={600}
          height={600}
          alt={"Placeholder"}
          className="aspect-square w-[300px] object-contain lg:w-[400px]"
        />
      </div>
    </div>
  );
};

export default AboutXpecto;
