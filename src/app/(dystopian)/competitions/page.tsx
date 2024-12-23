"use client";

import React from "react";
import { api } from "@/trpc/react";
import Link from "next/link";

const Page = () => {
  const competitions = api.eventReg.getAllCompetitions.useQuery().data;
  
  return (
    <div style={{ marginTop: 200, marginLeft: 50 }}>
      <h1>Competitions Page</h1>
      <br /><br />
      {
        competitions?.map((value, i)=>{
          return(
            <div key={i}>
              <Link href={"/competitions/"+value.competitionDetails.name} >{value.competitionDetails.name}</Link>
            </div>
          )
        })
      }
    </div>
  );
};

export default Page;
