"use client";

import React from "react";
import FetchValorantTournament from "@/components/featuredEvents/fetchValorantForEvent";
import FetchChessTournament from "@/components/featuredEvents/fetchChessForEvent";

const GameEvents = () => {
  return (
    <div className="max-w-8xl relative mx-auto w-full px-4 py-10">
      <div className="absolute inset-0 z-0 flex">
        <div
          className="w-1/2 bg-cover bg-center blur-sm filter"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/diqdg481x/image/upload/v1741510741/China_CG_phxcool_fullres_zp7tye.jpg')",
          }}
        />
        <div
          className="w-1/2 bg-cover bg-center blur-sm filter"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/diqdg481x/image/upload/v1741511903/chesscom_kqlzon.png')",
          }}
        />
      </div>
      <div className="absolute inset-0 z-0 bg-black bg-opacity-50" />

      <div className="relative z-10">
        <h1 className="mb-10 text-center text-4xl font-bold uppercase text-white">
          Featured Gaming Events
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FetchValorantTournament />
          <FetchChessTournament />
        </div>
      </div>
    </div>
  );
};

export default GameEvents;
