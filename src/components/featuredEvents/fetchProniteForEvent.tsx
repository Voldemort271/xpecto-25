"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import Loader from "@/components/common/loader";
import type { ProniteWithDetails } from "@/app/types";
import StaticImg from "public/images/img.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDateToHour } from "../../lib/utils";

const FetchPronites = () => {
  const router = useRouter();

  // const formattedDate = formatDateToHour(new Date()); // using this would not cause automatic update since this is not a state and so it does not change automaticallyh

  const {
    data: pastPronites,
    isLoading: pastLoading,
    error: pastError,
  } = api.pronite.getPastPronites.useQuery({
    date: formatDateToHour(new Date()),
  });
  const {
    data: upcomingPronites,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = api.pronite.getUpcomingPronites.useQuery({
    date: formatDateToHour(new Date()),
  });
  const {
    data: ongoingPronites,
    isLoading: ongoingLoading,
    error: ongoingError,
  } = api.pronite.getOngoingPronites.useQuery({
    date: formatDateToHour(new Date()),
  });

  // console.log(5, pastPronites, upcomingPronites, ongoingPronites);
  const [upcomingPro, setUpcomingPro] =
    useState<ProniteWithDetails | null>(null);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [animateUpcoming, setAnimateUpcoming] = useState(false);
  const [pastPro, setPastPro] = useState<ProniteWithDetails | null>(null);
  const [pastIndex, setPastIndex] = useState(0);
  const [animatePast, setAnimatePast] = useState(false);
  const [ongoingPro, setOngoingPro] = useState<ProniteWithDetails | null>(
    null,
  );
  const [ongoingIndex, setOngoingIndex] = useState(0);
  const [animateOngoing, setAnimateOngoing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!upcomingPronites) return;
      if (upcomingPronites.length > 0) {
        setAnimateUpcoming(true); // Start animation
        setTimeout(() => {
          setUpcomingIndex(
            (prevIndex) => (prevIndex + 1) % upcomingPronites.length,
          );
          setUpcomingPro(upcomingPronites[upcomingIndex] ?? null);
          setAnimateUpcoming(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [upcomingIndex, upcomingPronites]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pastPronites) return;
      if (pastPronites.length > 0) {
        setAnimatePast(true); // Start animation
        setTimeout(() => {
          setPastIndex(
            (prevIndex) => (prevIndex + 1) % pastPronites.length,
          );
          setPastPro(pastPronites[pastIndex] ?? null);
          setAnimatePast(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [pastIndex, pastPronites]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!ongoingPronites) return;
      if (ongoingPronites.length > 0) {
        setAnimateOngoing(true); // Start animation
        setTimeout(() => {
          setOngoingIndex(
            (prevIndex) => (prevIndex + 1) % ongoingPronites.length,
          );
          setOngoingPro(ongoingPronites[ongoingIndex] ?? null);
          setAnimateOngoing(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [ongoingIndex, ongoingPronites]);

  //TODO: Add some loader. I have no idea why the given loader is not Proing. It would be great if it can appear with a glitch animation

  if (pastLoading || upcomingLoading || ongoingLoading) return <div className="bg-black"><Loader /></div>;
  if (pastError || upcomingError || ongoingError) {
    return <p className="text-red-500">Error loading Pronites</p>;
  }

  return (
    <div className="relative flex lg:h-[70vh] max-lg:h-fit w-full flex-col justify-center border-b-2">
      <h1 className="absolute inset-0 z-20 h-fit p-4 text-center text-7xl font-bold text-amber-100">
        <Link href={`/pronites`}>Pronites</Link>
      </h1>
      <div className="relative lg:flex max-lg:flex-col h-full w-full justify-center">
        {upcomingPro && (
          <div
            onClick={() =>
              router.push(
                `/pronites/${upcomingPro.proniteDetails.slug}`,
              )
            }
            style={{
              backgroundImage: `url(${typeof upcomingPro.proniteDetails.cover === "string" && upcomingPro.proniteDetails.cover !== "" ? upcomingPro.proniteDetails.cover : StaticImg.src})`,
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
              {upcomingPro.proniteDetails.name}
            </h2>

            <p className="relative w-full text-center text-lg text-gray-300">
              {upcomingPro.proniteDetails.description}
            </p>
            <div className="absolute flex flex-col items-start bottom-0 p-4 w-full text-xl text-white font-extrabold mt-6">
                <div className="text-green-300">Starts</div> {new Date(upcomingPro.proniteDetails.begin_time).toLocaleString()}
              </div>
          </div>
        )}
        {ongoingPro && (
          <div
            onClick={() =>
              router.push(
                `/pronites/${ongoingPro.proniteDetails.slug}`,
              )
            }
            style={{
              backgroundImage: `url(${typeof ongoingPro.proniteDetails.cover === "string" && ongoingPro.proniteDetails.cover !== "" ? ongoingPro.proniteDetails.cover : StaticImg.src})`,
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
              {ongoingPro.proniteDetails.name}
            </h2>

            <p className="w-full text-center text-lg text-gray-300">
              {ongoingPro.proniteDetails.description}
            </p>
            <div className="absolute bottom-0 p-4 flex flex-col items-start w-full text-xl text-white font-extrabold mt-6">
                <div className="text-green-300">Started</div> {new Date(ongoingPro.proniteDetails.begin_time).toLocaleString()}
                <div className="text-red-300">Ends</div> {new Date(ongoingPro.proniteDetails.end_time).toLocaleString()}
              </div>
          </div>
        )}

        {pastPro && (
          <div
            onClick={() =>
              router.push(`/pronites/${pastPro.proniteDetails.slug}`)
            }
            style={{
              backgroundImage: `url(${typeof pastPro.proniteDetails.cover === "string" && pastPro.proniteDetails.cover !== "" ? pastPro.proniteDetails.cover : StaticImg.src})`,
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
              {pastPro.proniteDetails.name}
            </h2>

            <p className="w-full text-center text-lg text-gray-300">
              {pastPro.proniteDetails.description}
            </p>
            <div className="absolute bottom-0 p-4 flex flex-col items-start w-full text-xl text-white font-extrabold mt-6">
                <div className="text-blue-300">Finished on</div> {new Date(pastPro.proniteDetails.end_time).toLocaleString()}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchPronites;
