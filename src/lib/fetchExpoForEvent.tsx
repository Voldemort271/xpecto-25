"use client";

import React, { useEffect, useState, useRef } from "react";
import { api } from "@/trpc/react";
import Loader from "@/components/common/loader";

// ✅ Define TypeScript Type for Expos
interface Expos {
  id: string;
  exposDetails: {
    name: string;
    description: string;
    begin_time: string | null;
    cover?: string;
    regPlans?: {
      id: string;
      name: string;
      description: string;
      price: number;
      labelling: string;
      createdAt: string;
      updatedAt: string;
      eventDetailsId: string;
    }[];
  };
}

const FetchExpos = () => {
  const { data: expos, isLoading, error } = api.expo.getExpo.useQuery();
  const [randomExpo, setRandomExpo] = useState<Expos | null>(null);
  const [latestUpcomingExpo, setLatestUpcomingExpo] = useState<Expos | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const upcomingExposRef = useRef<Expos[]>([]);

  useEffect(() => {
    if (!expos) return;

    const formattedExpos: Expos[] = expos.map((expo: any) => ({
      id: expo.id,
      exposDetails: {
        name: expo.exposDetails?.name || "Unknown",
        description: expo.exposDetails?.description || "No description available",
        begin_time: expo.exposDetails?.begin_time ?? null,
        cover: expo.exposDetails?.cover || "/default-image.jpg",
        regPlans: expo.exposDetails?.regPlans || [],
      },
    }));

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const twentyDaysLater = new Date();
    twentyDaysLater.setDate(today.getDate() + 20);
    twentyDaysLater.setUTCHours(23, 59, 59, 999);

    const upcomingExpos = formattedExpos.filter((expo) => {
      const beginTime = expo.exposDetails.begin_time;
      if (!beginTime) return false;
      const beginDate = new Date(beginTime);
      return beginDate >= today && beginDate <= twentyDaysLater;
    });

    upcomingExposRef.current = upcomingExpos;

    if (upcomingExpos.length > 0) {
      setRandomExpo(upcomingExpos[0] ?? null);
    }

    const sortedByDate = [...formattedExpos].sort((a, b) => {
      const dateA = a.exposDetails.begin_time ? new Date(a.exposDetails.begin_time) : null;
      const dateB = b.exposDetails.begin_time ? new Date(b.exposDetails.begin_time) : null;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateA.getTime() - dateB.getTime();
    });

    setLatestUpcomingExpo(sortedByDate.find((expo) => expo.exposDetails.begin_time !== null) || null);
  }, [expos]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (upcomingExposRef.current.length > 0) {
        setAnimate(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingExposRef.current.length);
          setRandomExpo(upcomingExposRef.current[currentIndex] ?? null);
          setAnimate(false);
        }, 300);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Error loading expos</p>;

  return (
    <div className="relative flex flex-wrap justify-center items-start w-full py-10 gap-6">
      {/* ⏳ Latest Upcoming Expo */}
      {latestUpcomingExpo && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3">
          <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">⏳ Latest Upcoming Expo</h2>
          <p className="text-xl text-white text-center">{latestUpcomingExpo.exposDetails.name}</p>
          <p className="text-md text-gray-400 mt-2">
            📅 Starts on: {latestUpcomingExpo.exposDetails.begin_time
              ? new Date(latestUpcomingExpo.exposDetails.begin_time).toLocaleDateString()
              : "TBD"}
          </p>
        </div>
      )}

      {/* 🎯 Random Expo with Sliding Animation */}
      {randomExpo && (
        <div
          className={`flex flex-col items-center w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 ${
            animate ? "translate-x-5 opacity-50" : "translate-x-0 opacity-100"
          }`}
        >
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            {randomExpo.exposDetails.name}
          </h2>
          <p className="text-lg text-gray-300 text-center w-full">
            {randomExpo.exposDetails.description}
          </p>
          <img
            src={randomExpo.exposDetails.cover}
            alt={randomExpo.exposDetails.name}
            className="w-full h-48 object-cover rounded-lg mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default FetchExpos;
