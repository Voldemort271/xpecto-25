"use client";

import React from "react";
import { api } from "@/trpc/react";
import Link from "next/link";

const Page = () => {
  const pronites = api.eventReg.getAllPronites.useQuery().data;
  
  return (
    <div style={{ marginTop: 200, marginLeft: 50 }}>
      <h1>Pronites Page</h1>
      <br /><br />
      {
        pronites?.map((value, i)=>{
          return(
            <div key={i}>
              <Link href={"/pronites/"+value.proniteDetails.name} >{value.proniteDetails.name}</Link>
            </div>
          )
        })
      }
    </div>
  );
};

export default Page;
