"use client";

import { api } from "@/trpc/react";
import React, { useState, useEffect, useRef, use } from "react";

const Page = ({ params }: { params: Promise<{ comp: string }> }) => {
  const compName = use(params).comp.replaceAll("%20", " ");
  const compDetails = api.eventReg.getCompByName.useQuery({
    name: compName,
  }).data;

  const compRegisterMutation = api.eventReg.registerInCompetition.useMutation();
  const compRegisterMutationRef = useRef(compRegisterMutation);

  const [teamName, setTeamName] = useState("");
  const [debouncedTeamName, setDeboucedTeamName] = useState("");

  // Debouncer
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboucedTeamName(teamName);
    }, 500);

    return () => clearTimeout(timer);
  }, [teamName]);

  const { data } = api.team.findTeamByName.useQuery({
    name: debouncedTeamName,
  });
  const teamId = data?.id;

  const teamExists = api.eventReg.teamRegistered.useQuery({
    teamName: debouncedTeamName,
    compId: compDetails?.id ?? "",
  }).data;

  const handleRegister = () => {
    if (!teamId) {
      alert("Team doesn't exists");
      return;
    }

    if (teamExists) {
      alert("This team has already registered");
      return;
    }

    compRegisterMutationRef.current.mutate(
      {
        teamId: teamId,
        competitionId: compDetails?.id ?? "",
        submissions: "",
      },
      {
        onError: (error) => {
          console.error("Failed to register : ", error);
        },
      },
    );
    alert("Registration sucessfull!");
    window.location.reload();
  };

  const venue = compDetails?.competitionDetails.venue;

  const date = compDetails?.competitionDetails.begin_time.getDate();
  const month = compDetails?.competitionDetails.begin_time.getMonth();
  const year = compDetails?.competitionDetails.begin_time.getFullYear();
  const time = compDetails?.competitionDetails.begin_time.toLocaleTimeString();

  const dateEnd = compDetails?.competitionDetails.end_time.getDate();
  const monthEnd = compDetails?.competitionDetails.end_time.getMonth();
  const yearEnd = compDetails?.competitionDetails.end_time.getFullYear();
  const timeEnd = compDetails?.competitionDetails.end_time.toLocaleTimeString();

  return (
    <div style={{ marginTop: 200, marginLeft: 50 }}>
      Competition Name : {compName} <br /> Venue : {venue}
      <br />
      Starts at : {date}/{month}/{year} {time}
      <br />
      Ends at : {dateEnd}/{monthEnd}/{yearEnd} {timeEnd}
      <br />
      <br />
      <input
        style={{ color: "black" }}
        placeholder="Enter team name"
        value={teamName}
        onChange={(e) => {
          setTeamName(e.target.value);
        }}
      />
      <button onClick={handleRegister}>Register now</button>
    </div>
  );
};

export default Page;
