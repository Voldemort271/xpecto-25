"use client";

import React, { useEffect, useState, useRef } from "react";
import { api } from "@/trpc/react";
import Loader from "@/components/common/loader";

// ✅ Define TypeScript Type for Workshops
interface Workshop {
  id: string;
  workshopDetails: {
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

const FetchWorkshops = () => {
  const { data: workshops, isLoading, error } = api.workshop.getWorkshop.useQuery();
  const [randomWorkshop, setRandomWorkshop] = useState<Workshop | null>(null);
  const [latestUpcomingWorkshop, setLatestUpcomingWorkshop] = useState<Workshop | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const upcomingWorkshopsRef = useRef<Workshop[]>([]);

  useEffect(() => {
    if (!workshops) return;

    const formattedWorkshops: Workshop[] = workshops.map((workshop: any) => ({
      id: workshop.id,
      workshopDetails: {
        name: workshop.workshopDetails?.name || "Unknown",
        description: workshop.workshopDetails?.description || "No description available",
        begin_time: workshop.workshopDetails?.begin_time ?? null,
        cover: workshop.workshopDetails?.cover || "/default-image.jpg",
        regPlans: workshop.workshopDetails?.regPlans || [],
      },
    }));

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const twentyDaysLater = new Date();
    twentyDaysLater.setDate(today.getDate() + 20);
    twentyDaysLater.setUTCHours(23, 59, 59, 999);

    const upcomingWorkshops = formattedWorkshops.filter((workshop) => {
      const beginTime = workshop.workshopDetails.begin_time;
      if (!beginTime) return false;
      const beginDate = new Date(beginTime);
      return beginDate >= today && beginDate <= twentyDaysLater;
    });

    upcomingWorkshopsRef.current = upcomingWorkshops;

    if (upcomingWorkshops.length > 0) {
      setRandomWorkshop(upcomingWorkshops[0] ?? null);
    }

    const sortedByDate = [...formattedWorkshops].sort((a, b) => {
      const dateA = a.workshopDetails.begin_time ? new Date(a.workshopDetails.begin_time) : null;
      const dateB = b.workshopDetails.begin_time ? new Date(b.workshopDetails.begin_time) : null;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateA.getTime() - dateB.getTime();
    });

    setLatestUpcomingWorkshop(sortedByDate.find((workshop) => workshop.workshopDetails.begin_time !== null) || null);
  }, [workshops]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (upcomingWorkshopsRef.current.length > 0) {
        setAnimate(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingWorkshopsRef.current.length);
          setRandomWorkshop(upcomingWorkshopsRef.current[currentIndex] ?? null);
          setAnimate(false);
        }, 300);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Error loading workshops</p>;

  return (
    <div className="relative flex flex-wrap justify-center items-start w-full py-10 gap-6">
      {/* ⏳ Latest Upcoming Workshop */}
      {latestUpcomingWorkshop && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3">
          <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">⏳ Latest Upcoming Workshop</h2>
          <p className="text-xl text-white text-center">{latestUpcomingWorkshop.workshopDetails.name}</p>
          <p className="text-md text-gray-400 mt-2">
            📅 Starts on: {latestUpcomingWorkshop.workshopDetails.begin_time
              ? new Date(latestUpcomingWorkshop.workshopDetails.begin_time).toLocaleDateString()
              : "TBD"}
          </p>
        </div>
      )}

      {/* 🎯 Random Workshop with Sliding Animation */}
      {randomWorkshop && (
        <div
          className={`flex flex-col items-center w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 ${
            animate ? "translate-x-5 opacity-50" : "translate-x-0 opacity-100"
          }`}
        >
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            {randomWorkshop.workshopDetails.name}
          </h2>
          <p className="text-lg text-gray-300 text-center w-full">
            {randomWorkshop.workshopDetails.description}
          </p>
          <img
            src={randomWorkshop.workshopDetails.cover}
            alt={randomWorkshop.workshopDetails.name}
            className="w-full h-48 object-cover rounded-lg mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default FetchWorkshops;
