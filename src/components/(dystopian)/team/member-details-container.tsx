import React, { type ReactNode } from "react";

const MemberDetailsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full bg-neutral-950 md:pt-16">
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
};

export default MemberDetailsContainer;
