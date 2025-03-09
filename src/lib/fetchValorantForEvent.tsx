"use client";

import React from "react";

const FetchValorantTournament = () => {
  return (
    <div
      className="relative flex flex-col items-center w-full py-10 bg-cover bg-center"
      style={{ backgroundImage: "url('https://res.cloudinary.com/diqdg481x/image/upload/v1741510741/China_CG_phxcool_fullres_zp7tye.jpg')" }}
    >
      <div className="flex flex-col items-center w-4/5 md:w-3/4 lg:w-2/3 bg-black/80 p-6 rounded-lg shadow-lg border border-red-600">
        <h2 className="text-4xl font-bold text-red-500 mb-4 text-center">
          VALORANT CHAMPIONS SHOWDOWN 2025
        </h2>

        <p className="text-lg text-gray-300 text-center w-full">
          **🔥 Get ready for the most intense Valorant tournament of the year! 🔥**  
          Assemble your squad, **lock in your agents,** and prepare for an all-out battle where only the **sharpest aimers and best strategists** will rise to the top.   
          **Massive prize pool, high-stakes competition, and unforgettable moments await!**  
        </p>

        <p className="text-lg text-gray-400 text-center mt-4">
          📅 **Tournament Date:** March 30, 2025  
          🎯 **Format:** 5v5 | 🏆 **Prize Pool:** $10,000+  
          💥 **Do you have what it takes to be the champion?**  
        </p>
      </div>
    </div>
  );
};

export default FetchValorantTournament;
