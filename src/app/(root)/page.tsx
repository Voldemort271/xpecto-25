import React from "react";
import HomeScreen from "@/components/common/home";
import AboutXpecto from "@/components/home/about-xpecto";
import Marquee from "@/components/common/scrollable-marquee";
import AboutIITMandi from "@/components/home/about-iitmd";
import MerchPromo from "@/components/home/merch-promo";
import Footer from "@/components/home/footer";
import MarqueeContainer from "@/components/common/marquee-container";
import GlitchEffect from "@/components/home/featured-events";
import FetchCompetitions from "@/lib/fetchCompForEvent";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center bg-neutral-900">
      <HomeScreen />
      <div className="relative flex h-32 w-full flex-col justify-center overflow-hidden whitespace-nowrap border-y-2 border-amber-50 bg-neutral-950 text-9xl font-extrabold uppercase text-amber-50/[0.8]">
        <MarqueeContainer text={["29 to 31 march", "iit mandi techfest"]} />
      </div>
      {/* TODO: Add featured events section */}
      {/**TODO: Change all the cloudinary dummy images to true images "to be sent by the design team after 500 yrs" */}
      {/**TODO: Need someone to replace all the lorem ipsums */}
      {/**TODO: Try registering via google by account which has no first Name or last Name. Customize that clerk website which opens */}
      {/**TODO: The fetching profile marquee looks bugged. Fix it someone. please. */}
      <AboutXpecto />
      <AboutIITMandi />
      <Marquee speed={10}>
        xperience xpecto | weave through the glitch | xperience xpecto | weave
        through the glitch |
      </Marquee>
      <MerchPromo />
      <GlitchEffect />
      {/* <FetchCompetitions /> */}
      <Footer />
      <div className="relative flex h-32 w-full flex-col justify-center overflow-hidden whitespace-nowrap bg-neutral-950 text-9xl font-extrabold uppercase text-neutral-900">
        <MarqueeContainer
          text={["xpecto '25", "29 to 31 march 2025", "iit mandi"]}
        />
      </div>
    </div>
  );
};

export default Home;
