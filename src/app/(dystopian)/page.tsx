import React from "react";
import HomeScreen from "@/app/_components/(dystopian)/home";
import IntroScreen from "@/app/_components/(dystopian)/intro";

const Home = () => {
  return (
    <div className="h-full w-full">
      <HomeScreen />
      <IntroScreen />
    </div>
  );
};

export default Home;
