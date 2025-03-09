"use client";

import React, { useEffect, useState, useRef } from "react";
import { api } from "@/trpc/react";
import Loader from "@/components/common/loader";

// ✅ Define TypeScript Type for Pronites
interface Pronite {
  id: string;
  proniteDetails: {
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

const FetchPronites = () => {
  const { data: pronites, isLoading, error } = api.pronite.getPronite.useQuery();
  const [randomPronite, setRandomPronite] = useState<Pronite | null>(null);
  const [latestUpcomingPronite, setLatestUpcomingPronite] = useState<Pronite | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const upcomingPronitesRef = useRef<Pronite[]>([]);

  useEffect(() => {
    if (!pronites) return;

    const formattedPronites: Pronite[] = pronites.map((pronite: any) => ({
      id: pronite.id,
      proniteDetails: {
        name: pronite.proniteDetails?.name || "Unknown",
        description: pronite.proniteDetails?.description || "No description available",
        begin_time: pronite.proniteDetails?.begin_time ?? null,
        cover: pronite.proniteDetails?.cover || "/default-image.jpg",
        regPlans: pronite.proniteDetails?.regPlans || [],
      },
    }));

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const twentyDaysLater = new Date();
    twentyDaysLater.setDate(today.getDate() + 20);
    twentyDaysLater.setUTCHours(23, 59, 59, 999);

    const upcomingPronites = formattedPronites.filter((pronite) => {
      const beginTime = pronite.proniteDetails.begin_time;
      if (!beginTime) return false;
      const beginDate = new Date(beginTime);
      return beginDate >= today && beginDate <= twentyDaysLater;
    });

    upcomingPronitesRef.current = upcomingPronites;

    if (upcomingPronites.length > 0) {
      setRandomPronite(upcomingPronites[0] ?? null);
    }

    const sortedByDate = [...formattedPronites].sort((a, b) => {
      const dateA = a.proniteDetails.begin_time ? new Date(a.proniteDetails.begin_time) : null;
      const dateB = b.proniteDetails.begin_time ? new Date(b.proniteDetails.begin_time) : null;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateA.getTime() - dateB.getTime();
    });

    setLatestUpcomingPronite(sortedByDate.find((pronite) => pronite.proniteDetails.begin_time !== null) || null);
  }, [pronites]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (upcomingPronitesRef.current.length > 0) {
        setAnimate(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingPronitesRef.current.length);
          setRandomPronite(upcomingPronitesRef.current[currentIndex] ?? null);
          setAnimate(false);
        }, 300);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Error loading pronites</p>;

  return (
    <div className="relative flex flex-wrap justify-center items-start w-full py-10 gap-6">
      {/* ⏳ Latest Upcoming Pronite */}
      {latestUpcomingPronite && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3">
          <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">⏳ Latest Upcoming Pronite</h2>
          <p className="text-xl text-white text-center">{latestUpcomingPronite.proniteDetails.name}</p>
          <p className="text-md text-gray-400 mt-2">
            📅 Starts on: {latestUpcomingPronite.proniteDetails.begin_time
              ? new Date(latestUpcomingPronite.proniteDetails.begin_time).toLocaleDateString()
              : "TBD"}
          </p>
        </div>
      )}

      {/* 🎯 Random Pronite with Sliding Animation */}
      {randomPronite && (
        <div
          className={`flex flex-col items-center w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 ${
            animate ? "translate-x-5 opacity-50" : "translate-x-0 opacity-100"
          }`}
        >
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            {randomPronite.proniteDetails.name}
          </h2>
          <p className="text-lg text-gray-300 text-center w-full">
            {randomPronite.proniteDetails.description}
          </p>
          <img
            src={randomPronite.proniteDetails.cover}
            alt={randomPronite.proniteDetails.name}
            className="w-full h-48 object-cover rounded-lg mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default FetchPronites;
