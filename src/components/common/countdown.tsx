"use client";

import React, { useEffect, useState } from "react";
import Marquee from "@/components/common/scrollable-marquee";

const Countdown = () => {
  const targetDate = new Date("2025-03-29").getTime();
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // Initial null to avoid SSR mismatch

  useEffect(() => {
    const updateCountdown = () => {
      const remainingTime = targetDate - new Date().getTime();
      setTimeLeft(remainingTime > 0 ? remainingTime : 0);
    };

    updateCountdown(); // Set immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft === null) return <div>Loading...</div>; // Prevent SSR mismatch

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <Marquee speed={1}>
      {timeLeft > 0
        ? `${formatTime(timeLeft)} | xpecto '25 | ${formatTime(timeLeft)} | xpecto '25 | ${formatTime(timeLeft)} | xpecto '25`
        : "timer run out | xpecto is live | timer run out | xpecto is live | timer run out | xpecto is live | timer run out | xpecto is live"}
    </Marquee>
  );
};

export default Countdown;
