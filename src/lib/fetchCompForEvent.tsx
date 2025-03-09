"use client";

import React, { useEffect, useState, useRef } from "react";
import { api } from "@/trpc/react";
import Loader from "@/components/common/loader";

// ✅ Define TypeScript Type for Competitions
interface Competition {
  id: string;
  competitionDetails: {
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

const FetchCompetitions = () => {
  const { data: competitions, isLoading, error } = api.competition.getCompetitions.useQuery();

  const [randomCompetition, setRandomCompetition] = useState<Competition | null>(null);
  const [topEnrolledEvents, setTopEnrolledEvents] = useState<Competition[]>([]);
  const [latestUpcomingEvent, setLatestUpcomingEvent] = useState<Competition | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const upcomingCompetitionsRef = useRef<Competition[]>([]); // Stores filtered upcoming events

  useEffect(() => {
    if (!competitions) return;

    console.log("Raw Competitions Data:", competitions);

    // Format competitions
    const formattedCompetitions: Competition[] = competitions.map((comp: any) => ({
      id: comp.id,
      competitionDetails: {
        name: comp.competitionDetails?.name || "Unknown",
        description: comp.competitionDetails?.description || "No description available",
        begin_time: comp.competitionDetails?.begin_time ?? null,
        cover: comp.competitionDetails?.cover || "/default-image.jpg",
        regPlans: comp.competitionDetails?.regPlans || [],
      },
    }));

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const twentyDaysLater = new Date();
    twentyDaysLater.setDate(today.getDate() + 20);
    twentyDaysLater.setUTCHours(23, 59, 59, 999);

    console.log("Filtering competitions between:", today.toISOString(), "and", twentyDaysLater.toISOString());

    // 🎯 Filter upcoming competitions
    const upcomingCompetitions = formattedCompetitions.filter((comp) => {
      const beginTime = comp.competitionDetails.begin_time;
      if (!beginTime) return false;

      const beginDate = new Date(beginTime);
      if (isNaN(beginDate.getTime())) return false;

      beginDate.setUTCHours(0, 0, 0, 0);

      return beginDate >= today && beginDate <= twentyDaysLater;
    });

    upcomingCompetitionsRef.current = upcomingCompetitions;

    // 🔥 Random Competition Selection
    if (upcomingCompetitions.length > 0) {
      setRandomCompetition(upcomingCompetitions[0] ?? null);
    }

    // 🔥 Top 5 Most Enrolled Events
    const sortedByEnrollments = [...formattedCompetitions].sort(
      (a, b) => (b.competitionDetails.regPlans?.length ?? 0) - (a.competitionDetails.regPlans?.length ?? 0)
    );
    setTopEnrolledEvents(sortedByEnrollments.slice(0, 5));

    // 🔥 Latest Upcoming Event
    const sortedByDate = [...formattedCompetitions].sort((a, b) => {
      const dateA = a.competitionDetails.begin_time ? new Date(a.competitionDetails.begin_time) : null;
      const dateB = b.competitionDetails.begin_time ? new Date(b.competitionDetails.begin_time) : null;

      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateA.getTime() - dateB.getTime();
    });

    setLatestUpcomingEvent(sortedByDate.find((comp) => comp.competitionDetails.begin_time !== null) || null);
  }, [competitions]);

  // Auto-change random event every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      if (upcomingCompetitionsRef.current.length > 0) {
        setAnimate(true); // Start animation
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingCompetitionsRef.current.length);
          setRandomCompetition(upcomingCompetitionsRef.current[currentIndex] ?? null);
          setAnimate(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Error loading competitions</p>;

  return (
    <div className="relative flex flex-wrap justify-center items-start w-full py-10 gap-6">
      {/* 🎯 Left Section: Top 5 Most Enrolled Events + Latest Upcoming Event */}
      <div className="flex flex-col w-full md:w-1/3 gap-6">
        {/* 🔥 Top 5 Most Enrolled Events */}
        {topEnrolledEvents.length > 0 && (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">🔥 Top 5 Most Enrolled Events</h2>
            <ul className="text-lg text-gray-300 list-disc list-inside text-center">
              {topEnrolledEvents.map((event) => (
                <li key={event.id}>{event.competitionDetails.name}</li>
              ))}
            </ul>
          </div>
        )}
  
        {/* ⏳ Latest Upcoming Event (Placed Below Top 5) */}
        {latestUpcomingEvent && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">⏳ Latest Upcoming Event</h2>
            <p className="text-xl text-white text-center">{latestUpcomingEvent.competitionDetails.name}</p>
            <p className="text-md text-gray-400 mt-2">
              📅 Starts on: {latestUpcomingEvent.competitionDetails.begin_time
                ? new Date(latestUpcomingEvent.competitionDetails.begin_time).toLocaleDateString()
                : "TBD"}
            </p>
          </div>
        )}
      </div>
  
      {/* 🎯 Right Section: Random Competition with Sliding Animation */}
      {randomCompetition && (
        <div
          className={`flex flex-col items-center w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 ${
            animate ? "translate-x-5 opacity-50" : "translate-x-0 opacity-100"
          }`}
        >
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            {randomCompetition.competitionDetails.name}
          </h2>
  
          <p className="text-lg text-gray-300 text-center w-full">
            {randomCompetition.competitionDetails.description}
          </p>
  
          <img
            src={randomCompetition.competitionDetails.cover}
            alt={randomCompetition.competitionDetails.name}
            className="w-full h-48 object-cover rounded-lg mt-4"
          />
        </div>
      )}
    </div>
  );  
};

export default FetchCompetitions;
