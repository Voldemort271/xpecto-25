import { UserButton } from "@clerk/nextjs";
import React from "react";

const MainHome = () => {
  return (
    <>
        <div className="flex flex-col items-center">
          <div>Home</div>
          <UserButton />
        </div>
    </>
  );
};

export default MainHome;
