"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import Loader from "@/components/common/loader";
import type { WorkshopWithDetails } from "@/app/types";
import StaticImg from "public/images/img.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDateToHour } from "../../lib/utils";

const FetchWorkshops = () => {
  const router = useRouter();

  // const formattedDate = formatDateToHour(new Date()); // using this would not cause automatic update since this is not a state and so it does not change automaticallyh

  const {
    data: pastWorkshops,
    isLoading: pastLoading,
    error: pastError,
  } = api.workshop.getPastWorkshops.useQuery({
    date: formatDateToHour(new Date()),
  });
  const {
    data: upcomingWorkshops,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = api.workshop.getUpcomingWorkshops.useQuery({
    date: formatDateToHour(new Date()),
  });
  const {
    data: ongoingWorkshops,
    isLoading: ongoingLoading,
    error: ongoingError,
  } = api.workshop.getOngoingWorkshops.useQuery({
    date: formatDateToHour(new Date()),
  });

  // console.log(5, pastWorkshops, upcomingWorkshops, ongoingWorkshops);
  const [upcomingWork, setUpcomingWork] =
    useState<WorkshopWithDetails | null>(null);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [animateUpcoming, setAnimateUpcoming] = useState(false);
  const [pastWork, setPastWork] = useState<WorkshopWithDetails | null>(null);
  const [pastIndex, setPastIndex] = useState(0);
  const [animatePast, setAnimatePast] = useState(false);
  const [ongoingWork, setOngoingWork] = useState<WorkshopWithDetails | null>(
    null,
  );
  const [ongoingIndex, setOngoingIndex] = useState(0);
  const [animateOngoing, setAnimateOngoing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!upcomingWorkshops) return;
      if (upcomingWorkshops.length > 0) {
        setAnimateUpcoming(true); // Start animation
        setTimeout(() => {
          setUpcomingIndex(
            (prevIndex) => (prevIndex + 1) % upcomingWorkshops.length,
          );
          setUpcomingWork(upcomingWorkshops[upcomingIndex] ?? null);
          setAnimateUpcoming(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [upcomingIndex, upcomingWorkshops]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pastWorkshops) return;
      if (pastWorkshops.length > 0) {
        setAnimatePast(true); // Start animation
        setTimeout(() => {
          setPastIndex(
            (prevIndex) => (prevIndex + 1) % pastWorkshops.length,
          );
          setPastWork(pastWorkshops[pastIndex] ?? null);
          setAnimatePast(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [pastIndex, pastWorkshops]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!ongoingWorkshops) return;
      if (ongoingWorkshops.length > 0) {
        setAnimateOngoing(true); // Start animation
        setTimeout(() => {
          setOngoingIndex(
            (prevIndex) => (prevIndex + 1) % ongoingWorkshops.length,
          );
          setOngoingWork(ongoingWorkshops[ongoingIndex] ?? null);
          setAnimateOngoing(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [ongoingIndex, ongoingWorkshops]);

  //TODO: Add some loader. I have no idea why the given loader is not working. It would be great if it can appear with a glitch animation

  if (pastLoading || upcomingLoading || ongoingLoading) return <div className="bg-black"><Loader /></div>;
  if (pastError || upcomingError || ongoingError) {
    return <p className="text-red-500">Error loading Workshops</p>;
  }

  return (
    <div className="relative flex lg:h-[70vh] max-lg:h-fit w-full flex-col justify-center border-b-2">
      <h1 className="absolute inset-0 z-20 h-fit p-4 text-center text-7xl font-bold text-amber-100">
        <Link href={`/workshops`}>Workshops</Link>
      </h1>
      <div className="relative lg:flex max-lg:flex-col h-full w-full justify-center">
        {upcomingWork && (
          <div
            onClick={() =>
              router.push(
                `/workshops/${upcomingWork.workshopDetails.slug}`,
              )
            }
            style={{
              backgroundImage: `url(${typeof upcomingWork.workshopDetails.cover === "string" && upcomingWork.workshopDetails.cover !== "" ? upcomingWork.workshopDetails.cover : StaticImg.src})`,
            }}
            className={`relative flex w-full cursor-pointer flex-col items-center gap-12 bg-black bg-opacity-60 bg-cover bg-center bg-no-repeat p-6 bg-blend-darken shadow-lg transition-transform duration-300 ${
              animateUpcoming
                ? "translate-x-5 opacity-50"
                : "translate-x-0 opacity-100"
            }`}
          >
            <h1 className="relative mt-8 w-full p-10 text-start text-4xl text-green-300">
              Upcoming
            </h1>
            <h2 className="mb-4 text-center text-2xl font-bold text-amber-50">
              {upcomingWork.workshopDetails.name}
            </h2>

            <p className="relative w-full text-center text-lg text-gray-300">
              {upcomingWork.workshopDetails.description.slice(0, 150)}...
            </p>
            <div className="absolute flex flex-col items-start bottom-0 p-4 w-full text-xl text-white font-extrabold mt-6">
                <div className="text-green-300">Starts</div> {new Date(upcomingWork.workshopDetails.begin_time).toLocaleString()}
              </div>
          </div>
        )}
        {ongoingWork && (
          <div
            onClick={() =>
              router.push(
                `/workshops/${ongoingWork.workshopDetails.slug}`,
              )
            }
            style={{
              backgroundImage: `url(${typeof ongoingWork.workshopDetails.cover === "string" && ongoingWork.workshopDetails.cover !== "" ? ongoingWork.workshopDetails.cover : StaticImg.src})`,
            }}
            className={`flex w-full cursor-pointer flex-col items-center gap-12 bg-black bg-opacity-60 bg-cover bg-center bg-no-repeat p-6 bg-blend-darken shadow-lg transition-transform duration-300 ${
              animateOngoing
                ? "translate-x-5 opacity-50"
                : "translate-x-0 opacity-100"
            }`}
          >
            <h1 className="mt-8 w-full p-10 text-start text-4xl text-red-300">
              Ongoing
            </h1>
            <h2 className="mb-4 text-center text-2xl font-bold text-amber-50">
              {ongoingWork.workshopDetails.name}
            </h2>

            <p className="w-full text-center text-lg text-gray-300">
              {ongoingWork.workshopDetails.description}
            </p>
            <div className="absolute bottom-0 p-4 flex flex-col items-start w-full text-xl text-white font-extrabold mt-6">
                <div className="text-green-300">Started</div> {new Date(ongoingWork.workshopDetails.begin_time).toLocaleString()}
                <div className="text-red-300">Ends</div> {new Date(ongoingWork.workshopDetails.end_time).toLocaleString()}
              </div>
          </div>
        )}

        {pastWork && (
          <div
            onClick={() =>
              router.push(`/workshops/${pastWork.workshopDetails.slug}`)
            }
            style={{
              backgroundImage: `url(${typeof pastWork.workshopDetails.cover === "string" && pastWork.workshopDetails.cover !== "" ? pastWork.workshopDetails.cover : StaticImg.src})`,
            }}
            className={`flex w-full cursor-pointer flex-col items-center gap-12 bg-black bg-opacity-60 bg-cover bg-center bg-no-repeat p-6 bg-blend-darken shadow-lg transition-transform duration-300 ${
              animatePast
                ? "translate-x-5 opacity-50"
                : "translate-x-0 opacity-100"
            }`}
          >
            <h1 className="mt-8 w-full p-10 text-start text-4xl text-blue-300">
              Completed
            </h1>
            <h2 className="mb-4 text-center text-2xl font-bold text-amber-50">
              {pastWork.workshopDetails.name}
            </h2>

            <p className="w-full text-center text-lg text-gray-300">
              {pastWork.workshopDetails.description}
            </p>
            <div className="absolute bottom-0 p-4 flex flex-col items-start w-full text-xl text-white font-extrabold mt-6">
                <div className="text-blue-300">Finished on</div> {new Date(pastWork.workshopDetails.end_time).toLocaleString()}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchWorkshops;
