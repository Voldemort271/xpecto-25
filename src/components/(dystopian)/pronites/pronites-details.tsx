import React from "react";
import Image from "next/image";
import BgImage from "public/images/background.jpg";
import { Share_Tech } from "next/font/google";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const PronitesDetails = () => {
  return (
    <>
      <div className="relative h-full w-full">
        <Image
          src={BgImage}
          alt={"bg image"}
          className="absolute left-0 top-32 -z-20 h-full w-full object-cover object-bottom opacity-100 sm:top-0"
        />
        <div className="absolute left-0 top-32 -z-10 h-full w-full bg-gradient-to-r from-black/[0.5] to-black/[0.7] sm:top-0"></div>
        <div className="flex h-full w-full flex-col items-start justify-between p-12 pr-28 pt-44">
          <div className="flex flex-col items-end gap-2 self-end">
            <div className="text-8xl font-bold uppercase">test pronite</div>
            <div
              className={`max-w-screen-sm text-right text-lg ${sharetech.className} tracking-tight text-amber-50`}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
              cupiditate dolorem dolorum illo itaque, laudantium magnam,
              nesciunt nostrum quo sequi similique voluptatum! Aperiam autem ea
              est eum mollitia nihil voluptas? Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Ad animi assumenda commodi cumque
              deleniti, dignissimos dolore earum eius error laborum, nobis
              repellendus vel, vero.
            </div>
          </div>
          <div className="flex w-full items-end justify-between">
            <div className="flex flex-col">
              <div className="text-4xl font-extralight uppercase text-amber-50/[0.7]">
                #001
              </div>
              <div className="text-xl font-extralight uppercase text-amber-50/[0.7]">
                exhibit: featured celebrity
              </div>
              <div className="mb-2 text-xl font-extralight uppercase text-amber-50/[0.7]">
                timeline: {new Date("12-2-2024").toLocaleDateString()} -{" "}
                {new Date("12-20-2024").toLocaleDateString()}
              </div>
              <div className="text-lg font-extralight uppercase text-amber-50/[0.7]">
                more details &gt;&gt;
              </div>
            </div>
            <div className="flex gap-12">
              <div className="text-lg font-light uppercase text-amber-50">
                &lt;&lt; prev
              </div>
              <div className="text-lg font-light uppercase text-amber-50">
                next &gt;&gt;
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PronitesDetails;
