import React from "react";
import { type RegistrationLevel } from "@prisma/client";

const PlanCard = ({ data }: { data: RegistrationLevel }) => {
  return (
    <div className="relative z-0 col-span-1 flex flex-col items-center justify-center border border-t-0 border-amber-50 px-5 py-12">
      {data.name}
    </div>
  );
};

export default PlanCard;
