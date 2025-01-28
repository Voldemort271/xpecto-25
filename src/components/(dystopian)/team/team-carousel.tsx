"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import LoadingPic from "public/images/img.png";
import Image from "next/image";

const TeamCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    api.scrollNext();
  });

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-5 lg:px-12">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        orientation="vertical"
        className="hidden w-full md:block"
      >
        <CarouselContent className="-mt-1 h-[calc(100vh)]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="relative flex flex-col items-center justify-center pt-5 md:basis-1/2"
            >
              <div className="relative h-full max-h-[400px] w-full border-2 border-amber-50 lg:max-h-[500px]">
                <Image
                  src={LoadingPic}
                  alt={"Volunteer pic"}
                  className="h-full w-full"
                />
                {index}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        orientation="horizontal"
        className="flex h-full w-full flex-col items-center justify-center py-5 md:hidden"
      >
        <CarouselContent className="h-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="relative h-full max-h-[300px] max-w-[400px] basis-3/4 pl-5"
            >
              <Image
                src={LoadingPic}
                alt={"Volunteer pic"}
                className="h-full w-full border-2 border-amber-50 object-cover"
              />
              {index}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TeamCarousel;
