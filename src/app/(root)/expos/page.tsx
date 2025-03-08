"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import ExposCarouselContainer from "@/components/expos/expos-carousel-container";
import ExposCarousel from "@/components/expos/expos-carousel";
import ExpoDetailsContainer from "@/components/expos/expo-details-container";
import ExpoDetailsView from "@/components/expos/expo-details-view";
import Loader from "@/components/common/loader";

const ExposPage = () => {
  const { data: expos, isLoading } = api.expo.getExpo.useQuery();

  const [index, setIndex] = useState(0);

  return (
    <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
      {isLoading || !expos || !expos[index] ? (
        <Loader loadingText="Loading Expos ..." />
      ) : (
        <ExposCarouselContainer
          data={expos[index]}
          index={index}
          setIndex={setIndex}
          length={expos.length}
        >
          <ExposCarousel data={expos} index={index} setIndex={setIndex} />
        </ExposCarouselContainer>
      )}
      {isLoading || !expos || !expos[index] ? (
        <div className="h-full w-full bg-neutral-900"></div>
      ) : (
        <ExpoDetailsContainer data={expos} index={index} setIndex={setIndex}>
          <ExpoDetailsView data={expos[index]} key={index} />
        </ExpoDetailsContainer>
      )}
    </div>
  );
};

export default ExposPage;
