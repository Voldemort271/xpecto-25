"use client";

import React from "react";
import { api } from "@/trpc/react";
import Link from "next/link";

const Page = () => {
  const events = api.eventReg.getAllEvents.useQuery().data;
  
  return (
    <div>
      Events
    <div style={{ marginTop: 200, marginLeft: 50 }}>
      <h1>Events Page</h1>
      <br /><br />
      {
        events?.map((value, i)=>{
          return(
            <div key={i}>
              <Link href={"/events/"+value.eventDetails.name} >{value.eventDetails.name}</Link>
            </div>
          )
        })
      }
    </div>
  );
};

export default Page;
