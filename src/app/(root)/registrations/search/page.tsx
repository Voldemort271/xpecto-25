"use client";

import { Share_Tech } from "next/font/google";
import React, { useState } from "react";
import { api } from "@/trpc/react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { saveAs } from "file-saver"; // Ensure you have the correct type definitions installed
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useCurrentUser } from "@/lib/utils";
import Loader from "@/components/common/loader";
import NotFound from "@/app/not-found";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const Page = () => {
  const { CurrentUser, isLoading } = useCurrentUser();

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [includeUnverified, setIncludeUnverified] = useState(false);
  const [iitMandiOnly, setIitMandiOnly] = useState(false);
  const [downloadEvents, setDownloadEvents] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { data: events } = api.event.getAllEvents.useQuery();
  const { data: registrations } =
    api.registration.getFilteredRegistrations.useQuery(
      {
        eventId: selectedEvent ?? "",
        includeUnverified,
        iitMandiOnly,
      },
      { enabled: !!selectedEvent }, // Only fetch when an event is selected
    );

  if (isLoading || !CurrentUser) return <Loader />;

  if (
    CurrentUser.id === "" ||
    !process.env.NEXT_PUBLIC_SUBADMINS?.includes(CurrentUser.id)
  ) {
    return <NotFound />;
  }

  const handleDownloadCSV = () => {
    if (!registrations || registrations.length === 0) return;

    const csvContent = [
      [
        "Name",
        "Email",
        "College",
        "Contact",
        "Merch-Size",
        "Verified",
        "Event Name",
        "Plan",
        "Price",
        downloadEvents ? "Events" : ""
      ],
      ...registrations.map((reg) => [
        `"${reg.user.name}"`,
        `"${reg.user.email}"`,
        `"${reg.user.college_name}"`,
        `"${reg.user.contact}"`,
        `"${reg.user.size}"`,
        `"${reg.verified ? "Yes" : "No"}"`,
        `"${reg.event.name}"`,
        `"${reg.plan.name}"`,
        `"${reg.plan.price}"`,
        downloadEvents ? `"${reg.user.regEvents.filter(e => e.eventId !== "universaleve").map(e => e.event.name).join(", ")}"` : ``
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    (saveAs as (blob: Blob, filename: string) => void)(
      blob,
      "registrations.csv",
    );
  };

  return (
    <div className={`bg-neutral-900 ${sharetech.className} p-6 tracking-tight`}>
      <div className="h-16"></div>
      <h1 className="mb-6 text-3xl font-bold text-amber-50">
        Search Registrations
      </h1>

      {/* Event Selection */}
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold text-amber-50">
          Select Event
        </h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="destructive"
              role="combobox"
              aria-expanded={open}
              className={`w-[200px] justify-between ${sharetech.className}`}
            >
              {value
                ? events?.find((e) => e.name === value)?.name
                : "Select framework..."}
              <ChevronsUpDown
                className={`ml-2 h-4 w-4 shrink-0 opacity-50 ${sharetech.className}`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={`w-[200px] p-0 ${sharetech.className}`}>
            <Command>
              <CommandInput
                className={`${sharetech.className}`}
                placeholder="Search for an event..."
              />
              <CommandEmpty>No events found.</CommandEmpty>
              <CommandList className={`${sharetech.className}`}>
                {events?.map((event) => (
                  <CommandItem
                    key={event.id}
                    value={event.name}
                    onSelect={(curVal) => {
                      setSelectedEvent(event.id);
                      setValue(curVal === value ? "" : curVal);
                      setOpen(false);
                    }}
                  >
                    {event.name}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="unverified"
            checked={includeUnverified}
            onCheckedChange={() => setIncludeUnverified((e) => !e)}
            className={`${sharetech.className} bg-amber-50`}
          />
          <label htmlFor="unverified" className="text-amber-50">
            Include Unverified Registrations
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="iitMandiOnly"
            checked={iitMandiOnly}
            onCheckedChange={() => setIitMandiOnly((e) => !e)}
            className={`${sharetech.className} bg-amber-50`}
          />
          <label htmlFor="iitMandiOnly" className="text-amber-50">
            IIT Mandi Registrations Only
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="iitMandiOnly"
            checked={downloadEvents}
            onCheckedChange={() => setDownloadEvents((e) => !e)}
            className={`${sharetech.className} bg-amber-50`}
          />
          <label htmlFor="downloadEvents" className="text-amber-50">
            Download With Events
          </label>
        </div>
      </div>

      {/* Count of Registrations */}
      <div className="mb-4 text-lg font-semibold text-amber-50">
        Total Registrations: {registrations?.length ?? 0}
      </div>

      {/* Download Button */}
      <div className="mt-6">
        <Button
          onClick={handleDownloadCSV}
          disabled={!registrations || registrations.length === 0}
          className="rounded-b-none bg-amber-50 text-neutral-900 hover:bg-neutral-800 hover:text-amber-50"
        >
          Download CSV
        </Button>
      </div>

      {/* Table */}
      {registrations && registrations.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Merch-Size</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell>{reg.user.name}</TableCell>
                  <TableCell>{reg.user.email}</TableCell>
                  <TableCell>{reg.user.college_name}</TableCell>
                  <TableCell>{reg.user.contact}</TableCell>
                  <TableCell>{reg.user.size}</TableCell>
                  <TableCell>{reg.verified ? "Yes" : "No"}</TableCell>
                  <TableCell>{reg.event.name}</TableCell>
                  <TableCell>{reg.plan.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-amber-50">No registrations found.</p>
      )}
    </div>
  );
};

export default Page;
