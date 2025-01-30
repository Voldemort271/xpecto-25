import React, { type ReactNode } from "react";

const MemberDetailsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-neutral-950">
      {children}
    </div>
  );
};

export default MemberDetailsContainer;
