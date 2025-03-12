"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import Loader from "@/components/common/loader";
import type { ExpoWithDetails } from "@/app/types";
import StaticImg from "public/images/img.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDateToHour } from "../../lib/utils";
import { motion } from "motion/react";

const keyframes = {
  flicker: {
    opacity: [0, 1, 0.3, 0.7, 0.3, 1, 0.3, 1, 0.3, 1, 0.3, 1],
  },
};

const FetchExpos = () => {
  const router = useRouter();

  // const formattedDate = formatDateToHour(new Date()); // using this would not cause automatic update since this is not a state and so it does not change automaticallyh

  const {
    data: pastExpos,
    isLoading: pastLoading,
    error: pastError,
  } = api.expo.getPastExpos.useQuery({
    date: formatDateToHour(new Date()),
  });
  const {
    data: upcomingExpos,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = api.expo.getUpcomingExpos.useQuery({
    date: formatDateToHour(new Date()),
  });
  const {
    data: ongoingExpos,
    isLoading: ongoingLoading,
    error: ongoingError,
  } = api.expo.getOngoingExpos.useQuery({
    date: formatDateToHour(new Date()),
  });

  // console.log(5, pastExpos, upcomingExpos, ongoingExpos);
  const [upcomingExpo, setUpcomingExpo] = useState<ExpoWithDetails | null>(
    null,
  );
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [animateUpcoming, setAnimateUpcoming] = useState(false);
  const [pastExpo, setPastExpo] = useState<ExpoWithDetails | null>(null);
  const [pastIndex, setPastIndex] = useState(0);
  const [animatePast, setAnimatePast] = useState(false);
  const [ongoingExpo, setOngoingExpo] = useState<ExpoWithDetails | null>(null);
  const [ongoingIndex, setOngoingIndex] = useState(0);
  const [animateOngoing, setAnimateOngoing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!upcomingExpos) return;
      if (upcomingExpos.length > 0) {
        setAnimateUpcoming(true); // Start animation
        setTimeout(() => {
          setUpcomingIndex(
            (prevIndex) => (prevIndex + 1) % upcomingExpos.length,
          );
          setUpcomingExpo(upcomingExpos[upcomingIndex] ?? null);
          setAnimateUpcoming(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [upcomingIndex, upcomingExpos]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pastExpos) return;
      if (pastExpos.length > 0) {
        setAnimatePast(true); // Start animation
        setTimeout(() => {
          setPastIndex((prevIndex) => (prevIndex + 1) % pastExpos.length);
          setPastExpo(pastExpos[pastIndex] ?? null);
          setAnimatePast(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [pastIndex, pastExpos]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!ongoingExpos) return;
      if (ongoingExpos.length > 0) {
        setAnimateOngoing(true); // Start animation
        setTimeout(() => {
          setOngoingIndex((prevIndex) => (prevIndex + 1) % ongoingExpos.length);
          setOngoingExpo(ongoingExpos[ongoingIndex] ?? null);
          setAnimateOngoing(false); // Remove animation after update
        }, 300); // Delay to match animation duration
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [ongoingIndex, ongoingExpos]);

  // This ensures animation is started only when that particular competition is loaded
  const [aniKeyUp, setAniKeyUp] = useState(0);
  const [aniKeyOn, setAniKeyOn] = useState(0);
  const [aniKeyPast, setAniKeyPast] = useState(0);
  useEffect(()=>{
    setAniKeyUp(prev => prev+1);
  }, [upcomingExpo]);

  useEffect(()=>{
    setAniKeyOn(prev => prev+1);
  },[ongoingExpo]);

  useEffect(()=>{
    setAniKeyPast(prev => prev+1);
  }, [pastExpo]);

  //TODO: Add some loader. I have no idea why the given loader is not Expoing. It would be great if it can appear with a glitch animation

  if (pastLoading || upcomingLoading || ongoingLoading)
    return (
      <div className="bg-black">
        <Loader />
      </div>
    );
  if (pastError || upcomingError || ongoingError) {
    return <p className="text-red-500">Error loading Expos</p>;
  }

  return (
    <div className="relative flex w-full flex-col justify-center border-b-2 max-lg:h-fit lg:h-[70vh]">
      <h1 className="absolute inset-0 z-20 h-fit p-4 text-center text-7xl font-bold text-amber-100">
        <Link href={`/expos`}>Expos</Link>
      </h1>
      <div className="relative h-full w-full justify-center max-lg:flex-col lg:flex">
        {upcomingExpo && (
          <motion.div
            onClick={() =>
              router.push(`/expos/${upcomingExpo.exposDetails.slug}`)
            }
            style={{
              backgroundImage: `url(${typeof upcomingExpo.exposDetails.cover === "string" && upcomingExpo.exposDetails.cover !== "" ? upcomingExpo.exposDetails.cover : StaticImg.src})`,
            }}
            className={`relative flex w-full cursor-pointer flex-col items-center gap-12 bg-black bg-opacity-60 bg-cover bg-center bg-no-repeat p-6 bg-blend-darken shadow-lg transition-transform duration-300 ${
              animateUpcoming
                ? "translate-x-5 opacity-50"
                : "translate-x-0 opacity-100"
            }`}
            animate="flicker"
            key={`up-${aniKeyUp}`}
            variants={keyframes}
          >
            <h1 className="relative mt-8 w-full p-10 text-start text-4xl text-green-300">
              Upcoming
            </h1>
            <h2 className="mb-4 text-center text-2xl font-bold text-amber-50">
              {upcomingExpo.exposDetails.name}
            </h2>

            <p className="relative w-full text-center text-lg text-gray-300">
              {upcomingExpo.exposDetails.description}
            </p>
            <div className="absolute bottom-0 mt-6 flex w-full flex-col items-start p-4 text-xl font-extrabold text-white">
              <div className="text-green-300">Starts</div>{" "}
              {new Date(upcomingExpo.exposDetails.begin_time).toLocaleString()}
            </div>
          </motion.div>
        )}
        {ongoingExpo && (
          <motion.div
            onClick={() =>
              router.push(`/expos/${ongoingExpo.exposDetails.slug}`)
            }
            style={{
              backgroundImage: `url(${typeof ongoingExpo.exposDetails.cover === "string" && ongoingExpo.exposDetails.cover !== "" ? ongoingExpo.exposDetails.cover : StaticImg.src})`,
            }}
            className={`flex w-full cursor-pointer flex-col items-center gap-12 bg-black bg-opacity-60 bg-cover bg-center bg-no-repeat p-6 bg-blend-darken shadow-lg transition-transform duration-300 ${
              animateOngoing
                ? "translate-x-5 opacity-50"
                : "translate-x-0 opacity-100"
            }`}
            animate="flicker"
            key={`on-${aniKeyOn}`}
            variants={keyframes}
          >
            <h1 className="mt-8 w-full p-10 text-start text-4xl text-red-300">
              Ongoing
            </h1>
            <h2 className="mb-4 text-center text-2xl font-bold text-amber-50">
              {ongoingExpo.exposDetails.name}
            </h2>

            <p className="w-full text-center text-lg text-gray-300">
              {ongoingExpo.exposDetails.description}
            </p>
            <div className="absolute bottom-0 mt-6 flex w-full flex-col items-start p-4 text-xl font-extrabold text-white">
              <div className="text-green-300">Started</div>{" "}
              {new Date(ongoingExpo.exposDetails.begin_time).toLocaleString()}
              <div className="text-red-300">Ends</div>{" "}
              {new Date(ongoingExpo.exposDetails.end_time).toLocaleString()}
            </div>
          </motion.div>
        )}

        {pastExpo && (
          <motion.div
            onClick={() => router.push(`/expos/${pastExpo.exposDetails.slug}`)}
            style={{
              backgroundImage: `url(${typeof pastExpo.exposDetails.cover === "string" && pastExpo.exposDetails.cover !== "" ? pastExpo.exposDetails.cover : StaticImg.src})`,
            }}
            className={`flex w-full cursor-pointer flex-col items-center gap-12 bg-black bg-opacity-60 bg-cover bg-center bg-no-repeat p-6 bg-blend-darken shadow-lg transition-transform duration-300 ${
              animatePast
                ? "translate-x-5 opacity-50"
                : "translate-x-0 opacity-100"
            }`}
            animate="flicker"
            key={`past-${aniKeyPast}`}
            variants={keyframes}
          >
            <h1 className="mt-8 w-full p-10 text-start text-4xl text-blue-300">
              Completed
            </h1>
            <h2 className="mb-4 text-center text-2xl font-bold text-amber-50">
              {pastExpo.exposDetails.name}
            </h2>

            <p className="w-full text-center text-lg text-gray-300">
              {pastExpo.exposDetails.description}
            </p>
            <div className="absolute bottom-0 mt-6 flex w-full flex-col items-start p-4 text-xl font-extrabold text-white">
              <div className="text-blue-300">Finished on</div>{" "}
              {new Date(pastExpo.exposDetails.end_time).toLocaleString()}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FetchExpos;
