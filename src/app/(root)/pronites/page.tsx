"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import PronitesCarouselContainer from "@/components/pronites/pronites-carousel-container";
import PronitesCarousel from "@/components/pronites/pronites-carousel";
import ProniteDetailsContainer from "@/components/pronites/pronite-details-container";
import ProniteDetailsView from "@/components/pronites/pronite-details-view";
import Loader from "@/components/common/loader";

const PronitesPage = () => {
  const { data: pronites, isLoading } = api.pronite.getPronite.useQuery();
  const [index, setIndex] = useState(0);

  if (isLoading || !pronites || !pronites[index]) {
    return <Loader loadingText="Loading Pronites ..." />;
  }

  return (
    <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
      <PronitesCarouselContainer
        data={pronites[index]}
        index={index}
        setIndex={setIndex}
        length={pronites.length}
      >
        <PronitesCarousel data={pronites} index={index} setIndex={setIndex} />
      </PronitesCarouselContainer>
      <ProniteDetailsContainer
        data={pronites}
        index={index}
        setIndex={setIndex}
      >
        <ProniteDetailsView data={pronites[index]} key={index} />
      </ProniteDetailsContainer>
    </div>
  );
};

export default PronitesPage;
