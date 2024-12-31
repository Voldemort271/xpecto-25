import React from "react";
import HomeScreen from "@/components/(dystopian)/common/home";
import IntroScreen from "@/components/(dystopian)/common/intro";

const Home = () => {
  return (
    <div className="h-full w-full">
      <HomeScreen />
      <IntroScreen />
    </div>
  );
};

export default Home;
