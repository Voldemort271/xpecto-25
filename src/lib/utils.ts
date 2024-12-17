import { clsx, type ClassValue } from "clsx";
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

export const navElements = [
  "Home",
  "Events",
  "Competitions",
  "Workshops",
  "About",
  "Sponsors",
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
