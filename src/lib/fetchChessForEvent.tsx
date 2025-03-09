"use client";

import React from "react";

const FetchChessTournament = () => {
  return (
    <div
      className="relative flex flex-col items-center w-full min-h-screen py-10 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/diqdg481x/image/upload/v1741511903/chesscom_kqlzon.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh", // Ensures full screen height like Valorant
      }}
    >
      <div className="flex flex-col items-center w-4/5 md:w-3/4 lg:w-2/3 bg-black/80 p-6 rounded-lg shadow-lg border border-yellow-500">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4 text-center">
          CHESS.COM GRAND MASTERS CUP 2025
        </h2>

        <p className="text-lg text-gray-300 text-center w-full">
          **♟️ The Ultimate Battle of Brains Begins! ♟️**  
          Test your skills against the **best chess minds** in an intense online tournament.  
          **Speed, strategy, and precision** will determine the champion!  
          Compete for **glory, rankings, and a massive prize pool!**  
        </p>

        <p className="text-lg text-gray-400 text-center mt-4">
          📅 **Tournament Date:** April 15, 2025  
          ⏳ **Format:** Blitz & Rapid | 🏆 **Prize Pool:** $15,000+  
          👑 **Will you checkmate your way to victory?**  
        </p>
      </div>
    </div>
  );
};

export default FetchChessTournament;
