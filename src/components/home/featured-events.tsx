"use client";

import React from "react";
import FetchCompetitions from "@/components/featuredEvents/fetchCompForEvent";
import FetchExpos from "@/components/featuredEvents/fetchExpoForEvent";
// import FetchPronites from "@/components/featuredEvents/fetchProniteForEvent";
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
    
    <CarouselPrevious className="absolute z-10 bg-neutral-900 border border-gray-600 rounded-lg w-28 h-14 shadow-md hover:bg-neutral-700 hover:border-gray-400 hover:shadow-lg active:scale-95 transition-all duration-300 left-6" />
    <CarouselNext className="absolute z-10 bg-neutral-900 border border-gray-600 rounded-lg w-28 h-14 shadow-md hover:bg-neutral-700 hover:border-gray-400 hover:shadow-lg active:scale-95 transition-all duration-300 right-6" />


    </Carousel>
  );
};

export default FeaturedEvents;
