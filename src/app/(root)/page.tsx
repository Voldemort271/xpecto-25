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
      <div className="flex h-32 w-full flex-col justify-center overflow-hidden whitespace-nowrap border-y-2 border-amber-50 bg-neutral-950 text-9xl font-extrabold uppercase text-amber-50/[0.8]">
        <MarqueeContainer text={["29 to 31 march", "iit mandi techfest"]} />
      </div>
      {/* TODO: Add featured events section */}
      <AboutXpecto />
      <AboutIITMandi />
      <Marquee speed={10}>
        xperience xpecto | weave through the glitch | xperience xpecto | weave
        through the glitch |
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
