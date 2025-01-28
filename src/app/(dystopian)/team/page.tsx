"use client";

import React, { useState } from "react";
import TeamCarouselContainer from "@/components/(dystopian)/team/team-carousel-container";
import TeamCarousel from "@/components/(dystopian)/team/team-carousel";

const teamData = [
  {
    name: "player 1",
    role: "convenor",
    // org: "web dev",
    image: "",
    desc: "lorem ipsum",
    github: "",
    linkedin: "",
    instagram: "",
  },
  {
    name: "player 2",
    role: "head",
    org: "web dev",
    image: "",
    desc: "lorem ipsum",
    github: "",
    linkedin: "",
    instagram: "",
  },
  {
    name: "player 3",
    role: "volunteer",
    org: "web dev",
    image: "",
    desc: "lorem ipsum",
    github: "",
    linkedin: "",
    instagram: "",
  },
  {
    name: "player 4",
    role: "head",
    org: "content",
    image: "",
    desc: "lorem ipsum",
    github: "",
    linkedin: "",
    instagram: "",
  },
  {
    name: "player 5",
    role: "volunteer",
    org: "content",
    image: "",
    desc: "lorem ipsum",
    github: "",
    linkedin: "",
    instagram: "",
  },
];

const TeamPage = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid min-h-screen w-screen grid-rows-[600px_auto] bg-neutral-900 md:grid-cols-[400px_auto] md:grid-rows-1 lg:grid-cols-[600px_auto]">
      <TeamCarouselContainer>
        <TeamCarousel />
      </TeamCarouselContainer>
    </div>
  );
};

export default TeamPage;
