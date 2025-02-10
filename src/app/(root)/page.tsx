import React from "react";
import HomeScreen from "@/components/common/home";
import AboutXpecto from "@/components/home/about-xpecto";
import Marquee from "@/components/common/scrollable-marquee";
import AboutIITMandi from "@/components/home/about-iitmd";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center bg-neutral-900">
      <HomeScreen />
      <Marquee speed={5}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        architecto, cum delectus eaque eligendi eos est eveniet explicabo fugiat
        laboriosam magnam neque, perferendis praesentium provident quia,
        reprehenderit repudiandae sit voluptatem. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Asperiores aut debitis dolor ea eveniet ex
        facere facilis inventore ipsum laborum laudantium, numquam odio porro
        provident quae qui velit voluptas voluptatum!
      </Marquee>
      <AboutXpecto />
      <AboutIITMandi />
      <Marquee>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        architecto, cum delectus eaque eligendi eos est eveniet explicabo fugiat
        laboriosam magnam neque, perferendis praesentium provident quia,
        reprehenderit repudiandae sit voluptatem. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Asperiores aut debitis dolor ea eveniet ex
        facere facilis inventore ipsum laborum laudantium, numquam odio porro
        provident quae qui velit voluptas voluptatum!
      </Marquee>
      hihihi
    </div>
  );
};

export default Home;
