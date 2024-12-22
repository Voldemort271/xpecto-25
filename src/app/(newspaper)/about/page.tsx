import React from "react";
import { Jacquard_24 } from "next/font/google";
import { IM_Fell_Double_Pica } from "next/font/google";
import collegeImg from "public/iit-mandi-img.png";
import roadImg from "public/road-img.png";
import design from "public/Design.svg";
import design2 from "public/Design2.svg";
import Image from "next/image";

const jacquard = Jacquard_24({ weight: "400", subsets: ["latin"] });
const imfell = IM_Fell_Double_Pica({ weight: "400", subsets: ["latin"] });

const page = () => {
  return (
    <div className="mx-[15px] md:mx-[35px] lg:ml-[50px] lg:mr-[42px] xl:grid xl:grid-cols-2 md:gap-6 text-[#242424]">
      <div className="left">
        <div className={`${jacquard.className} relative py-1 text-center`}>
          <Image src={design} alt={"Design SVG"} className="w-screen" />
          <p className={`absolute inset-0 top-0 mt-[1px] md:mt-1 lg:mt-2 text-[18px] leading-7 md:text-3xl text-[#E8D4A9]`}>
            Something fancy your way comes - Auditorium at 6pm
          </p>
        </div>
        <div className={`${imfell.className}my-2 md:my-3 lg:my-4 text-center`}>
          <span className="text-5xl md:text-6xl lg:text-7xl">IIT M</span>
          <span className="text-3xl md:text-4xl lg:text-5xl">
            ANDI ORGANISES WEEK-LONG FEST, ATTRACTS THOUSANDS
          </span>
        </div>
        <div className="firstPara flex">
          <div className="hidden md:block h-[200px] min-w-[200px] items-center border-[2px] border-black">
            <p
              className={`${jacquard.className} translate-y-20 -rotate-45 text-[40px] font-bold`}
            >
              Place Ad here
            </p>
          </div>
          <div>
            <p className="md:mx-3 text-lg md:text-xl text-justify">
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
        <div className="hidden md:block secondPara">
          <p className="my-3 text-xl text-justify">
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
      <div className="right md:flex-col">
        <div className="">
          <Image
            src={collegeImg}
            alt={"College Image"}
            className="size-56 md:h-[25rem] w-screen border-[3px] border-black"
          />
        </div>
        <div className="mt-3 flex flex-col-reverse md:flex-row">
          <p className="w-full text-lg md:text-xl text-justify mr-4">
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

            <div className="w-4/5 flex-col items-center mx-auto">

              <div className={`${jacquard.className} relative mb-2 text-center`}>
                <Image src={design2} alt={"Design SVG"} className="w-screen" />
                <p
                  className={`absolute inset-0 top-[2px] text-4xl text-[#E8D4A9]`}
                >
                  Upcoming Program
                </p>
              </div>
              <Image
                src={roadImg}
                alt={"Road Image"}
                className="w-full border-[1px] border-black"
              />
              <p className="text-lg md:text-xl italic leading-[21px] text-justify mt-2">
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
