"use client";

import React from "react";
import FetchValorantTournament from "@/components/featuredEvents/fetchValorantForEvent";
import FetchChessTournament from "@/components/featuredEvents/fetchChessForEvent";

const GameEvents = () => {
  return (
    <div className="max-w-8xl mx-auto w-full py-10 px-4 relative">
      <div className="absolute inset-0 flex z-0">
        <div
          className="w-1/2 bg-cover bg-center filter blur-sm"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/diqdg481x/image/upload/v1741510741/China_CG_phxcool_fullres_zp7tye.jpg')",
          }}
        />
        <div
          className="w-1/2 bg-cover bg-center filter blur-sm"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/diqdg481x/image/upload/v1741511903/chesscom_kqlzon.png')",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
      
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          Featured Gaming Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FetchValorantTournament />
          <FetchChessTournament />
        </div>
      </div>
    </div>
  );
};

export default GameEvents;