import React, { type ReactNode } from "react";
import Image from "next/image";
import BgImage from "../../../../public/images/transparent-bg.png";

interface Props {
  title: string;
  children: ReactNode;
}

const SectionHeader = ({ title, children }: Props) => {
  return (
    <div className="relative z-0 flex min-h-96 w-full flex-col items-center justify-center border-y-2 border-amber-50 p-12">
      <Image
        src={`https://res.cloudinary.com/diqdg481x/image/upload/v1737737280/transparent-bg_md7je0.png`}
        alt={"transparent bg"}
        width={300}
        height={300}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-bottom"
      />
      <div className="text-7xl font-extrabold uppercase sm:text-8xl md:text-9xl lg:text-[200px]">
        {title}
      </div>
      <div className="text-4xl font-medium uppercase sm:text-6xl md:-mt-5 md:font-semibold">
        {children}
      </div>
    </div>
  );
};

export default SectionHeader;
