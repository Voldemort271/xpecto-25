import React from "react";
import Image from "next/image";
import BgImage from "public/images/background.jpg";

const PronitesDetails = () => {
  return (
    <>
      <Image
        src={BgImage}
        alt={"bg image"}
        className="absolute left-0 top-32 -z-10 h-full w-full object-cover object-bottom opacity-20 md:top-0"
      />
      <div className="flex h-full w-full flex-col items-start justify-between p-12 pt-44">
        <div>content</div>
        <div className="">hello</div>
      </div>
    </>
  );
};

export default PronitesDetails;
