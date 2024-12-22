import React from "react";
import {
  IM_Fell_Double_Pica,
  IM_Fell_Double_Pica_SC,
  Jacquard_24,
} from "next/font/google";
import collegeImg from "public/iit-mandi-img.png";
import roadImg from "public/road-img.png";
import Image from "next/image";

const jacquard = Jacquard_24({ weight: "400", subsets: ["latin"] });
const imfell = IM_Fell_Double_Pica({ weight: "400", subsets: ["latin"] });
const imfellsc = IM_Fell_Double_Pica_SC({ weight: "400", subsets: ["latin"] });

const page = () => {
  return (
    <div className="mx-4 py-4 text-neutral-900 md:mx-9 md:gap-6 lg:ml-12 lg:mr-10 xl:grid xl:grid-cols-2">
      <div>
        <div className={`${jacquard.className} relative py-1 text-center`}>
          <div className="bg-neutral-900/[0.9] px-5 py-1 text-xl leading-7 tracking-wide text-amber-100/[0.9] shadow-md shadow-neutral-900/[0.3] sm:mb-5 sm:py-2.5 sm:text-2xl xl:mb-0">
            Something fancy your way comes - Auditorium at 6pm
          </div>
        </div>
        <div className={`${imfell.className}my-2 text-center md:my-3 lg:my-4`}>
          <span
            className={`text-4xl md:text-5xl lg:text-7xl ${imfellsc.className}`}
          >
            IIT Mandi organises week-long fest, attracts thousands
          </span>
        </div>
        <div className="flex items-stretch gap-2.5">
          <div className="hidden min-w-52 items-center border-2 border-neutral-900 md:block"></div>
          <div>
            <p className="text-justify text-base sm:text-lg md:mx-3 md:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              vehicula lectus est, eget laoreet velit viverra vitae. Phasellus
              ornare lobortis massa, malesuada gravida sem venenatis ut. Aenean
              blandit semper est non mattis. Aliquam sed enim sit amet purus
              hendrerit pellentesque ac sed purus. Duis suscipit congue dapibus.
              Donec massa enim, mattis nec cursus ac, vulputate vitae mi. Duis
              interdum interdum varius. Vestibulum eget nisl nec tortor feugiat
              facilisis eget sed nibh. Donec placerat facilisis purus a feugiat.
              Vestibulum eget nisl nec tortor feugiat facilisis eget sed nibh.
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <p className="my-3 text-justify text-xl">
            Nulla nisi odio, accumsan eget eleifend et, hendrerit nec odio.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            vehicula lectus est, eget laoreet velit viverra vitae. Phasellus
            ornare lobortis massa, malesuada gravida sem venenatis ut. Aenean
            blandit semper est non mattis. Aliquam sed enim sit amet purus
            hendrerit pellentesque ac sed purus. Duis suscipit congue dapibus.
            Donec massa enim, mattis nec cursus ac, vulputate vitae mi. Duis
            interdum interdum varius. Vestibulum eget nisl nec tortor feugiat
            facilisis eget sed nibh. Donec placerat facilisis purus a feugiat.
            Nulla nisi odio, accumsan eget eleifend et, hendrerit nec odio. Duis
            suscipit congue dapibus. Donec massa enim, mattis nec cursus ac,
            vulputate vitae mi. Duis interdum interdum varius. Vestibulum eget
            nisl nec tortor feugiat facilisis eget sed nibh. Donec placerat
            facilisis purus a feugiat. Nulla nisi odio, accumsan eget eleifend
            et, hendrerit nec odio. Duis suscipit congue dapibus. Donec massa
            enim, mattis nec cursus ac, vulputate vitae mi. Duis interdum
            interdum varius. Vestibulum eget nisl nec tortor feugiat facilisis
            eget sed nibh. Donec placerat facilisis purus a feugiat. Nulla nisi
            odio, accumsan eget eleifend et, hendrerit nec odio.
          </p>
        </div>
      </div>
      <div className="md:flex-col">
        <Image
          src={collegeImg}
          alt={"College Image"}
          className="size-56 w-full border-[3px] border-black object-cover md:h-[25rem]"
        />
        <div className="mt-3 flex flex-col-reverse md:flex-row">
          <p className="mr-4 w-full text-justify text-lg md:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            vehicula lectus est, eget laoreet velit viverra vitae. Phasellus
            ornare lobortis massa, malesuada gravida sem venenatis ut. Aenean
            blandit semper est non mattis. Aliquam sed enim sit amet purus
            hendrerit pellentesque ac sed purus. Duis suscipit congue dapibus.
            Donec massa enim, mattis nec cursus ac, vulputate vitae mi. Duis
            interdum interdum varius. Vestibulum eget nisl nec tortor feugiat
            facilisis eget sed nibh. Donec placerat facilisis purus a feugiat.
            Vestibulum eget nisl nec tortor feugiat facilisis eget sed nibh.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            vehicula lectus est, eget laoreet velit viverra vitae. Phasellus
            ornare lobortis massa, malesuada gravida sem venenatis ut. Aenean
            blandit semper est non mattis.{" "}
          </p>

          <div className="mx-auto w-4/5 flex-col items-center">
            <div className={`${jacquard.className} relative mb-2 text-center`}>
              <div className="bg-neutral-900/[0.9] px-5 py-1 text-xl leading-7 tracking-wide text-amber-100/[0.9] shadow-md shadow-neutral-900/[0.3] sm:mb-5 sm:py-2.5 sm:text-2xl xl:mb-0">
                Upcoming Program
              </div>
            </div>
            <Image
              src={roadImg}
              alt={"Road Image"}
              className="w-full border-[1px] border-black"
            />
            <p className="mt-2 text-justify text-lg italic leading-[21px] md:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              vehicula lectus est, eget laoreet velit viverra vitae. Phasellus
              ornare lobortis massa, malesuada gravida sem venenatis ut. Aenean
              blandit semper est non mattis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
