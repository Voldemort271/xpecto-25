"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import WorkshopsCarouselContainer from "@/components/workshops/workshops-carousel-container";
import WorkshopsCarousel from "@/components/workshops/workshops-carousel";
import WorkshopDetailsContainer from "@/components/workshops/workshop-details-container";
import WorkshopDetailsView from "@/components/workshops/workshop-details-view";
import Loader from "@/components/common/loader";

const WorkshopsPage = () => {
  const { data: workshops, isLoading } = api.workshop.getWorkshop.useQuery();
  const [index, setIndex] = useState(0);

  if (isLoading || !workshops || !workshops[index]) {
    return <Loader loadingText="Loading Workshops ..." />;
  }

  return (
    <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
      <WorkshopsCarouselContainer
        data={workshops[index]}
        index={index}
        setIndex={setIndex}
        length={workshops.length}
      >
        <WorkshopsCarousel data={workshops} index={index} setIndex={setIndex} />
      </WorkshopsCarouselContainer>
      <WorkshopDetailsContainer
        data={workshops}
        index={index}
        setIndex={setIndex}
      >
        <WorkshopDetailsView data={workshops[index]} key={index} />
      </WorkshopDetailsContainer>
    </div>
  );
};

export default WorkshopsPage;
