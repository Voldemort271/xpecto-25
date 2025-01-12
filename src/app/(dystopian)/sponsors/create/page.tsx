"use client";

import { api } from "@/trpc/react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";

const Page = () => {
  const [sponName, setSponName] = useState("");
  const [sponLogo, setSponLogo] = useState("");

  const allEvents = api.sponsor.getAllEvents.useQuery().data!;

  const sponCreateMutation = api.sponsor.createSponsor.useMutation();
  const sponCreateMutationRef = useRef(sponCreateMutation);

  let sponsoredEventIds: string[] = [];

  const handleEventClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number,
  ) => {
    const target = e.target as HTMLButtonElement;
    const btnText = target.parentElement!.lastChild!.textContent;

    if (btnText == "ADD") {
      sponsoredEventIds.push(allEvents[i]!.id);

      target.parentElement!.lastChild!.textContent = "REMOVE";
    } else if (btnText == "REMOVE") {
      sponsoredEventIds = sponsoredEventIds.filter(
        (item) => item !== allEvents[i]!.id,
      );

      target.parentElement!.lastChild!.textContent = "ADD";
    }
  };

  const handleCreation = () => {
    if (sponName == "") {
      return toast.custom(
        (t) => (
          <CustomToast variant={"warning"} metadata={t}>
            Enter Sponsor name pls
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
    }
    if (sponsoredEventIds.length == 0) {
      return toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            No events selected
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
      // toast.error("No events selected");
    }
    console.log("Ye sare events hai : ", sponsoredEventIds);
    sponCreateMutationRef.current.mutate({
      name: sponName,
      logo: sponLogo,
      eventIds: sponsoredEventIds,
    });
    toast.custom(
      (t) => (
        <CustomToast variant={"success"} metadata={t}>
          creation successful!!
        </CustomToast>
      ),
      {
        position: "top-center",
      },
    );
    // toast.success("creation successful!!");
  };

  return (
    <div
      style={{
        paddingTop: 200,
        paddingLeft: 100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      Sponsor Creation page
      <br />
      <br />
      <input
        placeholder="Enter Spon Name"
        style={{ color: "black", width: 250 }}
        value={sponName}
        onChange={(e) => {
          setSponName(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        style={{ color: "black", width: 250 }}
        placeholder="Enter spon logo url"
        value={sponLogo}
        onChange={(e) => {
          setSponLogo(e.target.value);
        }}
      />
      <br />
      <button
        style={{ border: "1px solid white", width: 250 }}
        onClick={handleCreation}
      >
        CREATE
      </button>
      <br />
      Add events :
      {allEvents?.map((ele, i) => {
        return (
          <div
            key={i}
            style={{
              border: "1px solid white",
              padding: 1,
              width: 500,
            }}
          >
            <span style={{ alignItems: "center" }}>{ele.name}</span>{" "}
            <button
              style={{ border: "1px solid white" }}
              onClick={(e) => {
                handleEventClick(e, i);
              }}
            >
              ADD
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
