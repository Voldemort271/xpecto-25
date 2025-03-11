import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useContext } from "react";
import { SharedContext } from "./context";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export function useCurrentUser() {
  const context = useContext(SharedContext);
  if (!context) {
    throw new Error(
      "SharedContext must be used within a SharedContextProvider in home page",
    );
  }
  return context;
}

export const convertTitleCaseToSpaces = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};

// Helper function to format duration
export const formatDuration = (start: Date, end: Date) => {
  const durationMs = end.getTime() - start.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  
  const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  const durationWeeks = durationDays / 7;

  if (durationWeeks > 1) {
    return `${Math.floor(durationWeeks) + 1} week${Math.floor(durationWeeks) > 1 ? 's' : ''}`;
  } else if (durationDays > 1) {
    return `${Math.floor(durationDays)} day${Math.floor(durationDays) > 1 ? 's' : ''}`;
  } else {
    return `${Math.floor(durationHours)} hour${Math.floor(durationHours) > 1 ? 's' : ''}`;
  }
};

// Helper function to get the lowest price from registration plans
export const getLowestPrice = (regPlans: { price: number }[]) => {
  const prices = regPlans.map((plan) => plan.price);
  const lowestPrice = Math.min(...prices);
  return lowestPrice === 0 ? "free" : `₹${lowestPrice}`;
};

export const formatDateToHour = (date: Date) => {
  const isoString = date.toISOString();
  return isoString.slice(0, 13) + ":00:00.000Z";
};


export const navElements = [
  "Home",
  "Team",
  "Competitions",
  "About",
  "Workshops",
  "Expos",
  // "Pronites",
  "Sponsors",
  "Memberships"
];

export const profileSidebarElements = [
  "Profile",
  "Teams",
  "Settings",
  "Logout",
];

export function getCollFromEmail(email: string, csv: string): string {
  const rows = csv.split("\n");
  const domains = [];
  const names = [];
  for (const row of rows) {
    const values = row.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/g);
    const link = values[4];
    let domain = "";
    for (const s of link!) {
      domain += s;
      if (domain == "http://" || domain == "https://" || domain == "www.") {
        domain = "";
      }
    }
    if (domain.includes("/")) {
      domain = domain.slice(0, domain.indexOf("/"));
    }
    domains.push(domain);
    names.push(values[1]);
  }
  const n = email.indexOf("@") + 1;
  const inputDomain = email.slice(n, email.length);
  for (let i = 0; i < domains.length; i++) {
    if (domains[i]!.trim() != "" && inputDomain.includes(domains[i]!)) {
      if (names[i]!.includes('"')) {
        return names[i]!.slice(1, names[i]!.length - 1);
      } else {
        return names[i]!;
      }
    }
  }
  return "Individual";
}

export const competitionLevelSchema = [
  { name: "add", type: "icon", displayName: "", width: "2rem" },
  { name: "name", type: "string", displayName: "Name", width: "16rem" },
  {
    name: "description",
    type: "string",
    displayName: "Description",
    width: "30rem",
  },
  { name: "timeline", type: "date", displayName: "Timeline", width: "10rem" },
  { name: "venue", type: "string", displayName: "Venue", width: "16rem" },
  { name: "delete", type: "icon", displayName: "", width: "2rem" },
];

export const problemStatementSchema = [
  { name: "add", type: "icon", displayName: "", width: "2rem" },
  { name: "name", type: "string", displayName: "Name", width: "16rem" },
  {
    name: "description",
    type: "string",
    displayName: "Description",
    width: "30rem",
  },
  { name: "delete", type: "icon", displayName: "", width: "2rem" },
];

export const ruleSchema = [
  { name: "add", type: "icon", displayName: "", width: "2rem" },
  { name: "name", type: "string", displayName: "Name", width: "16rem" },
  { name: "delete", type: "icon", displayName: "", width: "2rem" },
];

export const planSchema = [
  { name: "add", type: "icon", displayName: "", width: "2rem" },
  { name: "name", type: "string", displayName: "Name", width: "16rem" },
  {
    name: "description",
    type: "string",
    displayName: "Description",
    width: "16rem",
  },
  { name: "price", type: "string", displayName: "Price", width: "16rem" },
  { name: "labelling", type: "string", displayName: "Label", width: "16rem" },
  { name: "delete", type: "icon", displayName: "", width: "2rem" },
];

export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  ms = 300,
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
