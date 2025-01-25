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
  // TODO: Fix prop sharing to pass whole pronites object
  return (
    <div className="relative z-0 h-full w-full overflow-clip">
      {!isLoading && pronites && pronites[0] ? (
        <PronitesDetails
          pronite={pronites[0]}
          index={index}
          length={10}
          setIndex={setIndex}
        >
          {/* TODO BONUS: Host all images on Cloudinary to reduce bundle size drastically */}
        </PronitesDetails>
      ) : (
        <div className="loading h-full w-full"></div>
      )}
      {!isLoading && pronites && pronites[0] && (
        <PronitesControl pronite={pronites[0]} />
      )}
    </div>
  );
};
export default Page;
