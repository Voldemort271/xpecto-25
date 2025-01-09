import React from "react";
import GlitchyPic from "public/images/glitchy.jpg";
import Image from "next/image";

const TestToast = () => {
  return (
    <div className="relative z-0 h-full w-80 border-2 border-amber-50 bg-neutral-900 px-12 py-5 text-amber-50">
      <Image
        src={GlitchyPic}
        alt={"Glitch"}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center opacity-70"
      />
      testtoast
    </div>
  );
};

export default TestToast;
