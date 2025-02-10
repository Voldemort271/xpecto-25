import React from "react";
import HomeScreen from "@/components/common/home";
import AboutXpecto from "@/components/home/about-xpecto";
import Marquee from "@/components/common/scrollable-marquee";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-12 bg-neutral-900">
      <HomeScreen />
      <AboutXpecto />
      <Marquee />
      hihihi
    </div>
  );
};

export default Home;
