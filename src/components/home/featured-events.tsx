"use client";

import React from "react";
import FetchCompetitions from "@/components/featuredEvents/fetchCompForEvent";
import FetchExpos from "@/components/featuredEvents/fetchExpoForEvent";
import FetchPronites from "@/components/featuredEvents/fetchProniteForEvent";
import FetchWorkshops from "@/components/featuredEvents/fetchWorkshopForEvent";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const components = [
  <FetchWorkshops key="workshop1" />,
  <FetchCompetitions key="comp1" />,
  // <FetchPronites key="pronite1" />,
  <FetchExpos key="expo1" />,
];

const FeaturedEvents = () => {
  //TODO: Improve the look of next and previous buttons. Make em look retro and cool
  //TODO: Switch on Pronites when they are ready

  return (
    <Carousel
      plugins={[Autoplay({ delay: 30000 })]}
      opts={{ align: "start", loop: true }}
      className="max-w-8xl mx-auto w-full relative"
    >
      <CarouselContent>
        {components.map((Component, index) => (
          <CarouselItem key={index}>{Component}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute z-10 bg-neutral-900 text-amber-50 size-20 my-auto ml-6 left-0"/>
      <CarouselNext className="absolute z-10 bg-neutral-900 text-amber-50 size-20 my-auto mr-6 right-0"/>
    </Carousel>
  );
};

export default FeaturedEvents;
