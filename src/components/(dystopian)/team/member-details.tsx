import React from "react";
import BgImg from "public/images/background-teams.png";
import { type TeamData } from "@/app/types";
import Image from "next/image";

interface Props {
  data?: TeamData;
}

const MemberDetails = ({ data }: Props) => {
  return (
    <div className="z-0 flex h-full w-full flex-col items-start justify-start bg-neutral-900 p-12">
      {data && (
        <Image
          src={BgImg}
          width={1920}
          height={1080}
          alt={data.org ?? "Background image"}
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        />
      )}
      {data?.org ?? "hi"}
    </div>
  );
};

export default MemberDetails;
