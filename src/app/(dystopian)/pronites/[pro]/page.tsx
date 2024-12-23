"use client";

import { api } from "@/trpc/react";
import React, { useState, useEffect, useRef, use } from "react";

const Page = ({ params }: { params: Promise<{ pro: string }> }) => {
  const proDetails = api.eventReg.getProniteByName.useQuery({
    name: use(params).pro.replaceAll("%20", " "),
  }).data;
  const proName = use(params).pro.replaceAll("%20", " ");

  const proRegisterMutation = api.eventReg.registerInPronite.useMutation();
  const proRegisterMutationRef = useRef(proRegisterMutation);

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

  const userExists = api.eventReg.userInPronite.useQuery({
    email: debouncedEmail,
    proniteId: proDetails?.id ?? "",
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

    proRegisterMutationRef.current.mutate(
      {
        userId: userId,
        proniteId: proDetails?.id ?? "",
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

  const venue = proDetails?.proniteDetails.venue;

  const date = proDetails?.proniteDetails.begin_time.getDate();
  const month = proDetails?.proniteDetails.begin_time.getMonth();
  const year = proDetails?.proniteDetails.begin_time.getFullYear();
  const time = proDetails?.proniteDetails.begin_time.toLocaleTimeString();

  const dateEnd = proDetails?.proniteDetails.end_time.getDate();
  const monthEnd = proDetails?.proniteDetails.end_time.getMonth();
  const yearEnd = proDetails?.proniteDetails.end_time.getFullYear();
  const timeEnd = proDetails?.proniteDetails.end_time.toLocaleTimeString();

  return (
    <div style={{ marginTop: 200, marginLeft: 50 }}>
      Pronite Name : {proName} <br /> Venue : {venue}
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
      <button onClick={handleRegister}>Register now</button>
    </div>
  );
};

export default Page;
