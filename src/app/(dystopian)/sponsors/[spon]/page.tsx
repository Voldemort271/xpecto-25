"use client";

import { api } from "@/trpc/react";
import React, { use } from "react";
import Image from "next/image";
import dummyImage from "@/../public/spon_logos/300.png";

const Page = ({ params }: { params: Promise<{ spon: string }> }) => {
  const sponId = use(params).spon;
  const {data, isLoading} = api.sponsor.getSponsor.useQuery({ id: sponId });

  if(isLoading) return;

  const sponDetails = data![0];

  return (
    <div style={{ paddingTop: 200, paddingLeft: 100 }}>
      <strong>{sponDetails?.name}</strong>
      <Image src={dummyImage} width={100} height={100} alt="logo" />
      <br />
      This sponser sponsers these events :
      <br />
      <ul>
        {sponDetails?.events.map((eve, i) => {
          return <li key={i}>{eve.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Page;
