import React from "react";
import HomeScreen from "@/components/common/home";
import AboutXpecto from "@/components/home/about-xpecto";
import Marquee from "@/components/common/scrollable-marquee";
import AboutIITMandi from "@/components/home/about-iitmd";
import MerchPromo from "@/components/home/merch-promo";
import AmbassadorPromo from "@/components/home/ambassador-promo";
import Countdown from "@/components/common/countdown";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center bg-neutral-900">
      <HomeScreen />
      <Marquee speed={5}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        architecto, cum delectus eaque eligendi eos est eveniet explicabo fugiat
        laboriosam magnam neque.
      </Marquee>
      <AboutXpecto />
      <AboutIITMandi />
      <Marquee>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        architecto, cum delectus eaque eligendi eos est eveniet explicabo fugiat
        laboriosam magnam neque.
      </Marquee>
      <MerchPromo />
      <AmbassadorPromo />
      {new Date().getTime() < new Date("2025-03-29").getTime() && <Countdown />}
    </div>
  );
};

export default Home;
