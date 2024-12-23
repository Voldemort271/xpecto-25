"use client";

import { api } from "@/trpc/react";
import React, { useState, useEffect, useRef, use } from "react";

const Page = ({ params }: { params: Promise<{ eve: string }> }) => {
  const eveDetails = api.eventReg.getEventByName.useQuery({
    name: use(params).eve.replaceAll("%20", " "),
  }).data;
  const eveName = use(params).eve.replaceAll("%20", " ");

  const eveRegisterMutation = api.eventReg.registerInEvent.useMutation();
  const eveRegisterMutationRef = useRef(eveRegisterMutation);

  const [email, setEmail] = useState("");
  const [debouncedEmail, setDeboucedEmail] = useState("");

  // Debouncer
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboucedEmail(email);
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  const { data } = api.user.getUserByEmail.useQuery({
    email: debouncedEmail,
  });
  const userId = data?.id;

  const userExists = api.eventReg.userInEvent.useQuery({
    email: debouncedEmail,
    eventId: eveDetails?.id ?? "",
  }).data;

  const handleRegister = () => {
    if (!userId) {
      alert("User doesn't exists");
      return;
    }

    if (userExists) {
      alert("This User has already registered");
      return;
    }

    eveRegisterMutationRef.current.mutate(
      {
        userId: userId,
        eventId: eveDetails?.id ?? "",
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

  const venue = eveDetails?.eventDetails.venue;

  const date = eveDetails?.eventDetails.begin_time.getDate();
  const month = eveDetails?.eventDetails.begin_time.getMonth();
  const year = eveDetails?.eventDetails.begin_time.getFullYear();
  const time = eveDetails?.eventDetails.begin_time.toLocaleTimeString();

  const dateEnd = eveDetails?.eventDetails.end_time.getDate();
  const monthEnd = eveDetails?.eventDetails.end_time.getMonth();
  const yearEnd = eveDetails?.eventDetails.end_time.getFullYear();
  const timeEnd = eveDetails?.eventDetails.end_time.toLocaleTimeString();

  return (
    <div style={{ marginTop: 200, marginLeft: 50 }}>
      Event Name : {eveName} <br /> Venue : {venue}
      <br />
      <br />
      Starts at : {date}/{month}/{year} {time}
      <br />
      Ends at : {dateEnd}/{monthEnd}/{yearEnd} {timeEnd}
      <br />
      <br />
      <input
        style={{ color: "black" }}
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Page;
