import React from "react";
import styles from "@/styles/home.module.css";

const Home = () => {
  return (
    <div className="relative h-full w-full bg-[url(/transparent-bg.png)] bg-cover bg-center bg-no-repeat">
      <div className="h-40"></div>
      <div className="flex h-[calc(100vh-240px)] w-full flex-col items-center justify-center uppercase text-amber-50">
        <div className="text-4xl font-medium uppercase sm:text-6xl md:-mb-5 md:font-bold">
          welcome to
        </div>
        <div className="text-8xl font-extrabold uppercase sm:text-9xl md:text-[200px] lg:text-[256px]">
          xpecto&nbsp;&apos;25
        </div>
        <div className="text-4xl font-medium uppercase sm:text-6xl md:-mt-5 md:font-bold">
          by iit mandi
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 flex h-20 w-full flex-row items-center border-t-2 border-amber-50 bg-neutral-900 text-6xl font-normal uppercase`}
      >
        <div className={styles.marquee}>
          <span>
            the biggest fest of the himalayas | 32 to 56 march 2025 | the
            biggest fest of the himalayas | 32 to 56 march 2025 | &nbsp;
          </span>
        </div>
        <div className={`${styles.marquee} ${styles.marquee2}`}>
          <span>
            the biggest fest of the himalayas | 32 to 56 march 2025 | the
            biggest fest of the himalayas | 32 to 56 march 2025 | &nbsp;
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
