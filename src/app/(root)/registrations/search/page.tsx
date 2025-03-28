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
import { TeamWithFullDetails } from "@/app/types";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface Event {
  id: string;
  name: string;
  competition: {
    teams: TeamWithFullDetails[];
  } | null;
}

const Page = () => {
  const { CurrentUser, isLoading } = useCurrentUser();

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [includeUnverified, setIncludeUnverified] = useState(false);
  const [iitMandiOnly, setIitMandiOnly] = useState(false);
  const [downloadEvents, setDownloadEvents] = useState(false);
  const [showTeams, setShowTeams] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { data: events } = api.event.getAllEvents.useQuery();
  const { data: registrations } =
    api.registration.getFilteredRegistrations.useQuery(
      {
        eventId: selectedEventId ?? "",
        includeUnverified,
        iitMandiOnly,
      },
      { enabled: !!selectedEventId }, // Only fetch when an event is selected
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
        downloadEvents ? "Events" : "",
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
        downloadEvents
          ? `"${reg.user.regEvents
              .filter((e) => e.eventId !== "universaleve")
              .map((e) => e.event.name)
              .join(", ")}"`
          : ``,
      ]),
    ]
      .map((row) => Array.isArray(row) ? row.join(",") : row)
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    (saveAs as (blob: Blob, filename: string) => void)(
      blob,
      `registrations${selectedEventId}.csv`,
    );
  };

  const handleDownloadTeamsCSV = () => {
    if (!selectedEvent?.competition) return;

    let csvContent = [
      ...selectedEvent.competition.teams.map((team, teamIndex) => {
        return team.team_members.map((member, memberIndex) => [
          memberIndex === 0 ? teamIndex + 1 : "",
          memberIndex === 0 ? (team.finalized ? "Yes" : "No") : "",
          `"${member.name}"`,
          `"${member.email}"`,
          `"${member.college_name}"`,
          `"${member.contact}"`,
          `"${member.size}"`,
        ]);
      }),
    ]
      .flat()
      .map((row) => Array.isArray(row) ? row.join(",") : row)
      .join("\n");
    csvContent = [[
      "Sr No.",
      "Finalized",
      "Name",
      "Email",
      "College",
      "Contact",
      "Size",
    ], csvContent].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    (saveAs as (blob: Blob, filename: string) => void)(
      blob,
      `teams${selectedEventId}.csv`,
    );
  }

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
                : "Select event..."}
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
                      setSelectedEventId(event.id);
                      setSelectedEvent(event);
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

      {selectedEvent?.competition && (
        <div className="flex items-center gap-2 py-4">
          <Checkbox
            id="showTeams"
            checked={showTeams}
            onCheckedChange={() => setShowTeams((e) => !e)}
            className={`${sharetech.className} bg-amber-50`}
          />
          <label htmlFor="showTeams" className="text-amber-50">
            Show Teams
          </label>
        </div>
      )}

      {/* Filters */}
      {!showTeams && (
        <>
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
                id="downloadEvents"
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
        </>
      )}

      {showTeams && (
        <div className="mb-4 text-lg font-semibold text-amber-50">
          Total Teams: {selectedEvent?.competition?.teams.length ?? 0}
        </div>
      )}

      {/* Download Button */}
      <div className="mt-6">
        <Button
          onClick={showTeams ? handleDownloadTeamsCSV : handleDownloadCSV}
          disabled={!registrations || registrations.length === 0}
          className="rounded-b-none bg-amber-50 text-neutral-900 hover:bg-neutral-800 hover:text-amber-50"
        >
          Download CSV
        </Button>
      </div>

      {/* Table */}
      {!showTeams ? (
        registrations && registrations.length > 0 ? (
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
        )
      ) : (
        selectedEvent?.competition &&
        selectedEvent.competition.teams.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr No.</TableHead>
                  <TableHead>Finalized</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedEvent.competition.teams.map((team, teamIndex) => {
                  const memberCount = team.team_members.length;
                  return team.team_members.map((member, memberIndex) => (
                    <TableRow key={`${team.id}-${member.id}`}>
                      {/* Only render these cells for the first member of each team */}
                      {memberIndex === 0 && (
                        <>
                          <TableCell
                            rowSpan={memberCount}
                            className="text-center"
                          >
                            {teamIndex + 1}
                          </TableCell>
                          <TableCell
                            rowSpan={memberCount}
                            className="text-center"
                          >
                            {team.finalized ? "Yes" : "No"}
                          </TableCell>
                        </>
                      )}
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.college_name}</TableCell>
                      <TableCell>{member.contact}</TableCell>
                      <TableCell>{member.size}</TableCell>
                    </TableRow>
                  ));
                })}
              </TableBody>
            </Table>
          </div>
        )
      )}
    </div>
  );
};

export default Page;
