"use client";

import React from "react";
import FetchValorantTournament from "@/components/featuredEvents/fetchValorantForEvent";
import FetchChessTournament from "@/components/featuredEvents/fetchChessForEvent";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const GameEvents = () => {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 5000 })]}
      opts={{ align: "start", loop: true }}
      className="max-w-8xl mx-auto w-full h-[80lvh]"
    >
      <CarouselContent>
        <CarouselItem>
          <FetchValorantTournament />
        </CarouselItem>
        <CarouselItem>
          <FetchChessTournament />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default GameEvents;
