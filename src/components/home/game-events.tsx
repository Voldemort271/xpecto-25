"use client";

import React from "react";
import FetchValorantTournament from "@/components/featuredEvents/fetchValorantForEvent";
import FetchChessTournament from "@/components/featuredEvents/fetchChessForEvent";

const GameEvents = () => {
  return (
    <div className="max-w-8xl mx-auto w-full py-10 px-4">
      <h1 className="text-4xl font-bold text-white text-center mb-10">Featured Gaming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FetchValorantTournament />
        <FetchChessTournament />
      </div>
    </div>
  );
};

export default GameEvents;