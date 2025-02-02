"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import ExposDetails from "@/components/(dystopian)/expos/expos-details";
import ExposControl from "@/components/(dystopian)/expos/expos-details-control";

const Page = () => {
  const [index, setIndex] = useState(0);

  const { data: expos, isLoading } = api.expo.getExpo.useQuery();

  useEffect(() => {
    if (expos) {
      console.log("expos", expos);
    }
  }, [expos]);
  // TODO: Fix prop sharing to pass whole pronites object
  return (
    <div className="relative z-0 h-full w-full overflow-clip">
      {!isLoading && expos && expos[0] ? (
        <ExposDetails
          expos={expos[0]}
          index={index}
          length={10}
          setIndex={setIndex}
        >
          {/* TODO BONUS: Host all images on Cloudinary to reduce bundle size drastically */}
        </ExposDetails>
      ) : (
        <div className="loading h-full w-full"></div>
      )}
      {!isLoading && expos && expos[0] && (
        <ExposControl expos={expos[0]} />
      )}
    </div>
  );
};
export default Page;
