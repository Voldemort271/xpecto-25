"use client";

import React from "react";
import { api } from "@/trpc/react"; // Import the api object
import { ProniteType } from "../../../types";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const createPronite = api.pronite.createPronite.useMutation();

  const handleChange = (key: string, value: string | Date | number) => {
    setForm((initState) => ({ ...initState, [key]: value }));
  };

  const savePronite = (form: ProniteType) => {
    try {
      createPronite.mutate(
        {
          max_capacity: form.max_capacity,
          ticket_price: form.ticket_price,
          begin_time: form.begin_time,
          end_time: null,
          venue: form.venue,
          description: form.description,
          name: form.name,
        },
        {
          onSuccess: (e) => {
            //alert('Data Saved..')
            router.push("/pronites");
          },
        },
      );
    } catch (e) {
      console.error(e);
      alert("Could not create. Try again!");
    }
  };

  const [form, setForm] = React.useState<ProniteType>({
    name: "",
    begin_time: new Date(),
    end_time: null,
    description: "",
    max_capacity: 0,
    ticket_price: 0,
    venue: "",
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="left-col">
            <label className="font-semibold">Name</label>
          </div>
          <div>
            <input
              type="text"
              className="field-text"
              placeholder="Name"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="left-col">
            <label className="left font-semibold">Description</label>
          </div>
          <div>
            <textarea
              rows={3}
              className="field-text"
              placeholder="Description"
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="left-col">
            <label className="font-semibold">Venue</label>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => handleChange("venue", e.target.value)}
              className="field-text"
              placeholder="Venue"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="left-col">
            <label className="font-semibold">Date and Time</label>
          </div>
          <div>
            <input
              type="datetime-local"
              onChange={(e) =>
                handleChange("begin_time", new Date(e.target.value))
              }
              className="field"
            />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="left-col">
            <label className="font-semibold">Max Capacity</label>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) =>
                handleChange("max_capacity", Number(e.target.value))
              }
              className="field"
              placeholder="max capacity"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="left-col">
            <label className="font-semibold">Ticket Price</label>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) =>
                handleChange("ticket_price", Number(e.target.value))
              }
              className="field"
              placeholder="Price"
            />
          </div>
        </div>

        <div className="flex flex-row">
          <button
            className="btn"
            onClick={() => savePronite(form)}
            style={{ marginLeft: "10.5rem", marginTop: "1rem" }}
          >
            Create
          </button>
          <button
            className="btn"
            style={{ marginLeft: "1rem", marginTop: "1rem" }}
            onClick={() => {
              router.push("/pronites");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
export default Page;
