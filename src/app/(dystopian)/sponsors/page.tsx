"use client";

import Link from "next/link";
import React from "react";
import { api } from "@/trpc/react";
import Image from "next/image";
import dummyImage from "@/../public/spon_logos/300.png";

const Page = () => {
  const allSpons = api.sponsor.getSponsor.useQuery({ id: "" }).data; // id="" fetches all spons

  return (
    <div style={{ paddingTop: 200, paddingLeft: 100 }}>
      <Link
        href="/sponsors/create"
        style={{ border: "1px solid white", padding: 2 }}
      >
        Create sponsor
      </Link>
      <br />
      <br />
      OUR SPONSORS 👇
      <br />
      <br />
      <div style={{ display: "flex" }}>
        {allSpons?.map((spon, i) => {
          return (
            <div key={i} style={{ padding: 10 }}>
              <Image src={dummyImage} alt="logo" width={100} height={100} />

              <Link
                style={{ border: "1px solid white", margin: 1 }}
                href={"/sponsors/"+spon.id}
              >
                {spon.name}
              </Link>
              <br />
              <em>Events : </em>
              <ul>
                {spon.events.map((eve, k) => {
                  return <li key={k}>{eve.name}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
