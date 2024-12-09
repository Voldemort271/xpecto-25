import SharedContextProvider from "@/lib/context";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const MainHome = () => {
  return (
    <>
      <SharedContextProvider>
        <div className="flex flex-col items-center">
          <div>Home</div>
          <UserButton />
        </div>
      </SharedContextProvider>
    </>
  );
};

export default MainHome;
