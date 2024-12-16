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

export const profileSidebarElements = ["Profile", "Teams", "Settings", "Logout"];

