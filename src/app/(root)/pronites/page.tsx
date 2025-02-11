"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import PronitesCarouselContainer from "@/components/pronites/pronites-carousel-container";
import PronitesCarousel from "@/components/pronites/pronites-carousel";
import ProniteDetailsContainer from "@/components/pronites/pronite-details-container";
import ProniteDetailsView from "@/components/pronites/pronite-details-view";

const PronitesPage = () => {
  const { data: pronites, isLoading } = api.pronite.getPronite.useQuery();

  const [index, setIndex] = useState(0);

  return (
    <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
      {isLoading || !pronites || !pronites[index] ? (
        <div className="loading h-full w-full border-2 border-amber-50 bg-neutral-900"></div>
      ) : (
        <PronitesCarouselContainer data={pronites[index]}>
          <PronitesCarousel data={pronites} index={index} setIndex={setIndex} />
        </PronitesCarouselContainer>
      )}
      {isLoading || !pronites || !pronites[index] ? (
        <div className="h-full w-full bg-neutral-900"></div>
      ) : (
        <ProniteDetailsContainer
          data={pronites}
          index={index}
          setIndex={setIndex}
        >
          <ProniteDetailsView data={pronites[index]} key={index} />
        </ProniteDetailsContainer>
      )}
    </div>
  );
};

export default PronitesPage;
// "use client";

// import React, { useState } from "react";
// import { api } from "@/trpc/react";
// import PronitesCarouselContainer from "@/components/pronites/pronites-carousel-container";
// import PronitesCarousel from "@/components/pronites/pronites-carousel";
// import ProniteDetailsContainer from "@/components/pronites/pronite-details-container";
// import ProniteDetailsView from "@/components/pronites/pronite-details-view";

// const PronitesPage = () => {
//   const { data: pronites, isLoading } = api.pronite.getPronite.useQuery();

//   const [index, setIndex] = useState(0);

//   return (
//     <div className="grid min-h-screen w-screen grid-rows-[600px_auto] overflow-clip bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
//       {isLoading || !pronites || !pronites[index] ? (
//         <div className="loading h-full w-full border-2 border-amber-50 bg-neutral-900"></div>
//       ) : (
//         <PronitesCarouselContainer data={pronites[index]}>
//           <PronitesCarousel data={pronites} index={index} setIndex={setIndex} />
//         </PronitesCarouselContainer>
//       )}
//       {isLoading || !pronites || !pronites[index] ? (
//         <div className="h-full w-full bg-neutral-900"></div>
//       ) : (
//         <ProniteDetailsContainer
//           data={pronites}
//           index={index}
//           setIndex={setIndex}
//         >
//           <ProniteDetailsView data={pronites[index]} key={index} />
//         </ProniteDetailsContainer>
//       )}
//     </div>
//   );
// };

// export default PronitesPage;
