import React from "react";
import HomeScreen from "@/components/common/home";
import AboutXpecto from "@/components/home/about-xpecto";
import Marquee from "@/components/common/scrollable-marquee";
import AboutIITMandi from "@/components/home/about-iitmd";
import MerchPromo from "@/components/home/merch-promo";
import Footer from "@/components/home/footer";
import MarqueeContainer from "@/components/common/marquee-container";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center bg-neutral-900">
      <HomeScreen />
      {/* TODO: Change text */}
      <Marquee speed={5}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        architecto, cum delectus eaque eligendi eos est eveniet explicabo fugiat
        laboriosam magnam neque.
      </Marquee>
      {/* TODO: Add featured events section */}
      <AboutXpecto />
      <AboutIITMandi />
      <Marquee>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        architecto, cum delectus eaque eligendi eos est eveniet explicabo fugiat
        laboriosam magnam neque.
      </Marquee>
      <MerchPromo />
      <Footer />
      <div className="flex h-32 w-full flex-col justify-center overflow-hidden whitespace-nowrap bg-neutral-950 text-9xl font-extrabold uppercase text-neutral-900">
        <MarqueeContainer
          text={["xpecto '25", "32 to 56 march 2025", "iit mandi"]}
        />
      </div>
    </div>
  );
};

export default Home;
