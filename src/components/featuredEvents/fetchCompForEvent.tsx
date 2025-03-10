"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import Loader from "@/components/common/loader";
import type { CompetitionWithDetails } from "@/app/types";
import StaticImg from "public/images/img.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDateToHour } from "../../lib/utils";

const FetchCompetitions = () => {
  const router = useRouter();

  //TODO: Disable glitch or animate if only one competition is there (or rather change animation to a glitch in and out instead of glitch slide. It would look better)

  // const formattedDate = formatDateToHour(new Date()); // using this would not cause automatic update since this is not a state and so it does not change automaticallyh

  const {
    data: pastCompetitions,
    isLoading: pastLoading,
    error: pastError,
  } = api.competition.getPastCompetitions.useQuery({
    date: formatDateToHour(new Date()),
  });
  const {
    data: upcomingCompetitions,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = api.competition.getUpcomingCompetitions.useQuery({
    date: formatDateToHour(new Date()),
  });
  const {
    data: ongoingCompetitions,
    isLoading: ongoingLoading,
    error: ongoingError,
  } = api.competition.getOngoingCompetitions.useQuery({
    date: formatDateToHour(new Date()),
  });

  // console.log(5, pastCompetitions, upcomingCompetitions, ongoingCompetitions);
  const [upcomingComp, setUpcomingComp] =
    useState<CompetitionWithDetails | null>(null);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [animateUpcoming, setAnimateUpcoming] = useState(false);
  const [pastComp, setPastComp] = useState<CompetitionWithDetails | null>(null);
  const [pastIndex, setPastIndex] = useState(0);
  const [animatePast, setAnimatePast] = useState(false);
  const [ongoingComp, setOngoingComp] = useState<CompetitionWithDetails | null>(
    null,
  );
  const [ongoingIndex, setOngoingIndex] = useState(0);
  const [animateOngoing, setAnimateOngoing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!upcomingCompetitions) return;
      if (upcomingCompetitions.length > 0) {
        setAnimateUpcoming(true); // Start animation
        setTimeout(() => {
          setUpcomingIndex(
            (prevIndex) => (prevIndex + 1) % upcomingCompetitions.length,
          );
          setUpcomingComp(upcomingCompetitions[upcomingIndex] ?? null);
          setAnimateUpcoming(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [upcomingIndex, upcomingCompetitions]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pastCompetitions) return;
      if (pastCompetitions.length > 0) {
        setAnimatePast(true); // Start animation
        setTimeout(() => {
          setPastIndex(
            (prevIndex) => (prevIndex + 1) % pastCompetitions.length,
          );
          setPastComp(pastCompetitions[pastIndex] ?? null);
          setAnimatePast(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [pastIndex, pastCompetitions]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!ongoingCompetitions) return;
      if (ongoingCompetitions.length > 0) {
        setAnimateOngoing(true); // Start animation
        setTimeout(() => {
          setOngoingIndex(
            (prevIndex) => (prevIndex + 1) % ongoingCompetitions.length,
          );
          setOngoingComp(ongoingCompetitions[ongoingIndex] ?? null);
          setAnimateOngoing(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [ongoingIndex, ongoingCompetitions]);

  //TODO: Add some loader. I have no idea why the given loader is not working. It would be great if it can appear with a glitch animation

  if (pastLoading || upcomingLoading || ongoingLoading) return <div className="bg-black"><Loader /></div>;
  if (pastError || upcomingError || ongoingError) {
    return <p className="text-red-500">Error loading competitions</p>;
  }

  return (
    <div className="relative flex lg:h-[70vh] max-lg:h-fit w-full flex-col justify-center border-b-2">
      <h1 className="absolute inset-0 z-20 h-fit p-4 text-center text-7xl font-bold text-amber-100">
        <Link href={`/competitions`}>Competitions</Link>
      </h1>
      <div className="relative lg:flex max-lg:flex-col h-full w-full justify-center">
        {upcomingComp && (
          <div
            onClick={() =>
              router.push(
                `/competitions/${upcomingComp.competitionDetails.slug}`,
              )
            }
            style={{
              backgroundImage: `url(${typeof upcomingComp.competitionDetails.cover === "string" && upcomingComp.competitionDetails.cover !== "" ? upcomingComp.competitionDetails.cover : StaticImg.src})`,
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
              {upcomingComp.competitionDetails.name}
            </h2>

            <p className="relative w-full text-center text-lg text-gray-300">
              {upcomingComp.competitionDetails.description}
            </p>
            <div className="absolute flex flex-col items-start bottom-0 p-4 w-full text-xl text-white font-extrabold mt-6">
                <div className="text-green-300">Starts</div> {new Date(upcomingComp.competitionDetails.begin_time).toLocaleString()}
              </div>
          </div>
        )}
        {ongoingComp && (
          <div
            onClick={() =>
              router.push(
                `/competitions/${ongoingComp.competitionDetails.slug}`,
              )
            }
            style={{
              backgroundImage: `url(${typeof ongoingComp.competitionDetails.cover === "string" && ongoingComp.competitionDetails.cover !== "" ? ongoingComp.competitionDetails.cover : StaticImg.src})`,
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
              {ongoingComp.competitionDetails.name}
            </h2>

            <p className="w-full text-center text-lg text-gray-300">
              {ongoingComp.competitionDetails.description}
            </p>
            <div className="absolute bottom-0 p-4 flex flex-col items-start w-full text-xl text-white font-extrabold mt-6">
                <div className="text-green-300">Started</div> {new Date(ongoingComp.competitionDetails.begin_time).toLocaleString()}
                <div className="text-red-300">Ends</div> {new Date(ongoingComp.competitionDetails.end_time).toLocaleString()}
              </div>
          </div>
        )}

        {pastComp && (
          <div
            onClick={() =>
              router.push(`/competitions/${pastComp.competitionDetails.slug}`)
            }
            style={{
              backgroundImage: `url(${typeof pastComp.competitionDetails.cover === "string" && pastComp.competitionDetails.cover !== "" ? pastComp.competitionDetails.cover : StaticImg.src})`,
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
              {pastComp.competitionDetails.name}
            </h2>

            <p className="w-full text-center text-lg text-gray-300">
              {pastComp.competitionDetails.description}
            </p>
            <div className="absolute bottom-0 p-4 flex flex-col items-start w-full text-xl text-white font-extrabold mt-6">
                <div className="text-blue-300">Finished on</div> {new Date(pastComp.competitionDetails.end_time).toLocaleString()}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchCompetitions;
