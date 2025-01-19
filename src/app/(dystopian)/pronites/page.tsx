"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import PronitesDetails from "@/components/(dystopian)/pronites/pronites-details";
import PronitesControl from "@/components/(dystopian)/pronites/pronites-details-control";

const Page = () => {
  const [index, setIndex] = useState(0);

  const { data: pronites, isLoading } = api.pronite.getPronite.useQuery();

  useEffect(() => {
    if (pronites) {
      console.log("pronites", pronites);
    }
  }, [pronites]);

  return (
    <div className="relative z-0 h-full w-full overflow-clip">
      {!isLoading && pronites && pronites[0] ? (
        <PronitesDetails
          title={pronites[0].proniteDetails.name}
          slug={pronites[0].proniteDetails.slug}
          begin_time={pronites[0].proniteDetails.begin_time}
          end_time={pronites[0].proniteDetails.end_time}
          img={`/event_covers/pronites/${pronites[0].proniteDetails.slug}.jpeg`}
          hash={pronites[0].proniteDetailsId}
          index={index}
          length={10}
          setIndex={setIndex}
        >
          {/* TODO BONUS: Host all images on Cloudinary to reduce bundle size drastically */}
          {pronites[0].proniteDetails.description}
        </PronitesDetails>
      ) : (
        <div className="loading h-full w-full"></div>
      )}
      {!isLoading && pronites && pronites[0] && <PronitesControl />}
    </div>
  );
};
export default Page;
