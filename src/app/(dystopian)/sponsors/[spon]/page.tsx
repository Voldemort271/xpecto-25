"use client";

import { api } from "@/trpc/react";
import React, { use } from "react";
import Image from "next/image";
import dummyImage from "@/../public/spon_logos/300.png";

const Page = ({ params }: { params: Promise<{ spon: string }> }) => {
  const sponSlug = use(params).spon;
  const { data, isLoading } = api.sponsor.getSponsorBySlug.useQuery({
    slug: sponSlug,
  });

  if (isLoading) return;

  const sponDetails = data;

  return (
    <div style={{ paddingTop: 200, paddingLeft: 100 }}>
      <strong>{sponDetails?.name}</strong>
      <Image src={`https://res.cloudinary.com/diqdg481x/image/upload/v1737737324/300_ainvey.png`} width={100} height={100} alt="logo" />
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
