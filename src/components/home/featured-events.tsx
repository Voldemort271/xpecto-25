"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FetchCompetitions from "@/lib/fetchCompForEvent";
import FetchExpos from "@/lib/fetchExpoForEvent";
import FetchPronites from "@/lib/fetchProniteForEvent";
import FetchWorkshops from "@/lib/fetchWorkshopForEvent";
import FetchValorantTournament from "@/lib/fetchValorantForEvent";
import FetchChessTournament from "@/lib/fetchChessForEvent";

const FeaturedEvents = () => {
  // ✅ List of components to cycle through
  const components = [
    <FetchCompetitions key="comp1" />,
    <FetchExpos key="expo1" />,
    <FetchPronites key="pronite1" />,
    <FetchWorkshops key="workshop1" />,
    <FetchValorantTournament key="valorant1" />,
    <FetchChessTournament key="chess1" />,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Navigate to the Previous Component
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : components.length - 1));
  };

  // ✅ Navigate to the Next Component
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < components.length - 1 ? prevIndex + 1 : 0));
  };

  // ✅ Auto-scroll every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000); // 10 seconds interval

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]); // Runs when currentIndex changes

  return (
    <div className="relative flex flex-col items-center w-full bg-neutral-900 py-12">
      <h1 className="text-4xl font-extrabold text-amber-50 mb-8">Featured Events</h1>

      {/* Updated Wrapper with Darker Background and Border */}
      <div className="relative flex items-center w-full md:w-3/4 lg:w-2/3 bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-[-50px] md:left-[-70px] text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition duration-300"
        >
          <ChevronLeft size={30} />
        </button>

        {/* Dynamically Render Current Component */}
        <div className="w-full">{components[currentIndex]}</div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-[-50px] md:right-[-70px] text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition duration-300"
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default FeaturedEvents;
