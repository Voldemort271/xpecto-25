"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { type CompetitionWithDetails } from "@/app/types";
import StaticImg from "../../../public/images/img.png";

interface Props {
  data: CompetitionWithDetails[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const CompetitionsCarousel = ({ data, index, setIndex }: Props) => {
  const [apiDesktop, setApiDesktop] = useState<CarouselApi>();
  const [apiMobile, setApiMobile] = useState<CarouselApi>();

  const [pos, setPos] = useState(0);

  useEffect(() => {
    if (!apiDesktop) return;
    apiDesktop.scrollTo(index);
  }, [apiDesktop, index]);

  useEffect(() => {
    if (!apiMobile) return;
    apiMobile.scrollTo(index);
  }, [apiMobile, index]);

  useEffect(() => {
    if (!apiDesktop) return;
    apiDesktop.on("select", () => {
      setPos(apiDesktop.selectedScrollSnap());
    });
  }, [apiDesktop]);

  useEffect(() => {
    if (!apiMobile) return;
    apiMobile.on("select", () => {
      setPos(apiMobile.selectedScrollSnap());
    });
  }, [apiMobile]);

  useEffect(() => {
    setIndex(pos);
  }, [pos, setIndex]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center md:px-5 lg:px-12">
      <Carousel
        setApi={setApiDesktop}
        opts={{
          align: "center",
          loop: true,
        }}
        orientation="vertical"
        className="hidden w-full md:block"
      >
        <CarouselContent className="-mt-1 h-[calc(100vh)]">
          {data.map((el, index) => (
            <CarouselItem
              key={index}
              className="relative flex flex-col items-center justify-center pt-5 md:basis-1/2"
            >
              <div className="relative h-full max-h-[400px] w-full border-2 border-amber-50 lg:max-h-[500px]">
                <Image
                  src={
                    el.competitionDetails.cover === ""
                      ? StaticImg
                      : el.competitionDetails.cover
                  }
                  alt={el.competitionDetails.name}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        setApi={setApiMobile}
        opts={{
          align: "center",
          loop: true,
        }}
        orientation="horizontal"
        className="flex h-full w-screen flex-col items-center justify-center md:hidden"
      >
        <CarouselContent className="w-screen px-5">
          {data.map((el, index) => (
            <CarouselItem
              key={index}
              className={`${index === 0 ? "-ml-2.5" : "ml-2.5"} h-[300px] w-full max-w-[400px] basis-3/4`}
            >
              <Image
                src={
                  el.competitionDetails.cover === ""
                    ? StaticImg
                    : el.competitionDetails.cover
                }
                alt={el.competitionDetails.name}
                width={600}
                height={800}
                className="h-full w-full border-2 border-amber-50 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CompetitionsCarousel;
