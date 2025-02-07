"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import WorkshopsCarouselContainer from "@/components/(dystopian)/workshops/workshops-carousel-container";
import WorkshopsCarousel from "@/components/(dystopian)/workshops/workshops-carousel";
import WorkshopDetailsContainer from "@/components/(dystopian)/workshops/workshop-details-container";
import WorkshopDetailsView from "@/components/(dystopian)/workshops/workshop-details-view";

const WorkshopsPage = () => {
  const { data: workshops, isLoading } = api.workshop.getWorkshop.useQuery();

  const [index, setIndex] = useState(0);

  return (
    <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
      {isLoading || !workshops || !workshops[index] ? (
        <div className="loading h-full w-full border-2 border-amber-50 bg-neutral-900"></div>
      ) : (
        <WorkshopsCarouselContainer data={workshops[index]}>
          <WorkshopsCarousel
            data={workshops}
            index={index}
            setIndex={setIndex}
          />
        </WorkshopsCarouselContainer>
      )}
      {isLoading || !workshops || !workshops[index] ? (
        <div className="h-full w-full bg-neutral-900"></div>
      ) : (
        <WorkshopDetailsContainer
          data={workshops}
          index={index}
          setIndex={setIndex}
        >
          <WorkshopDetailsView data={workshops[index]} key={index} />
        </WorkshopDetailsContainer>
      )}
    </div>
  );
};

export default WorkshopsPage;
