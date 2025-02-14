"use client";

import React, { useContext, useEffect, useState } from "react";
import AmbassadorPromo from "@/components/home/ambassador-promo";
import Image from "next/image";
import Logo from "public/logo.png";
import Link from "next/link";
import { navElements } from "@/lib/utils";
import { CursorContext } from "@/context/cursor-context";

const Footer = () => {
  const { setIsHovered } = useContext(CursorContext);

  const targetDate = new Date("2025-03-29").getTime();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const remainingTime = targetDate - new Date().getTime();
      setTimeLeft(remainingTime > 0 ? remainingTime : 0);
    };

    updateCountdown(); // Set immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatTime = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return { days };
  };

  return (
    <div className="relative z-0 grid w-full grid-cols-6 bg-gradient-to-r from-amber-50 to-amber-50/[0.3]">
      <Image
        src={
          "https://res.cloudinary.com/diqdg481x/image/upload/v1739214344/images/byyegxxonyqiuiioikvr.jpg"
        }
        width={1920}
        height={800}
        alt={"Ambassador background"}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center opacity-30"
      />
      <div className="col-span-6 border-2 border-amber-50 sm:border-b-0">
        <AmbassadorPromo />
      </div>

      <div className="col-span-6 grid grid-cols-3 gap-5 border-t-0 border-amber-50 bg-neutral-950 px-12 py-24 sm:col-span-3 sm:border-t-2 lg:col-span-4">
        <div className="col-span-3 flex flex-col items-center space-y-2 font-normal uppercase xl:col-span-1">
          <Image src={Logo} alt={"Xpecto logo"} className="w-24" />
          <div className="text-4xl">Xpecto</div>
          <div className="text-center text-lg font-light leading-none text-neutral-400">
            indian institute of technology, mandi <br />
            Parashar Road, Tehsil Sadar <br /> Near Kataula, Kamand <br />
            Himachal Pradesh 175005
          </div>
        </div>
        <div className="col-span-3 space-y-2 lg:col-span-2 xl:col-span-1">
          <div className="text-2xl uppercase">important links</div>
          <div className="grid grid-cols-2 text-xl font-light uppercase text-neutral-300">
            {navElements.map((item) => (
              <Link
                key={item}
                href={`/${item !== "Home" ? item.toLowerCase() : ""}`}
                className="cursor-none hover:underline"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-3 space-y-2 lg:col-span-1">
          <div className="text-2xl uppercase">legal terms</div>
          <div className="grid grid-cols-1 text-xl font-light uppercase text-neutral-300">
            <Link
              href={`/legal/terms`}
              className="cursor-none hover:underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              terms of service
            </Link>
            <Link
              href={`/legal/privacy`}
              className="cursor-none hover:underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              privacy policy
            </Link>
          </div>
          <div className="pt-5 text-2xl uppercase">contact us</div>
          <div className="grid grid-cols-1 text-xl font-light uppercase text-neutral-300">
            <Link
              href={`mailto:tech@xpecto.org`}
              target={"_blank"}
              className="cursor-none hover:underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              developer team
            </Link>
            <Link
              href={`mailto:info@xpecto.org`}
              target={"_blank"}
              className="cursor-none hover:underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              help desk
            </Link>
          </div>
        </div>
        <div className="col-span-3 -mb-5 mt-12 text-center text-sm font-light uppercase text-neutral-600">
          copyright &copy; 2025, xpecto, iit mandi.
        </div>
      </div>
      {timeLeft ? (
        <div className="col-span-6 flex flex-col items-center justify-center border-2 border-amber-50 px-12 py-12 uppercase text-neutral-900 sm:col-span-3 sm:border-t-0 sm:py-24 lg:col-span-2">
          <div className="text-center text-7xl font-semibold leading-[0.7] xl:text-8xl xl:leading-[0.5]">
            {formatTime(timeLeft).days} days{" "}
            <span className="text-5xl xl:text-6xl">to go</span>
          </div>
          <div className="text-4xl font-semibold">xpecto &apos;25</div>
        </div>
      ) : (
        <div className="loading col-span-3 flex flex-col justify-center bg-neutral-900 lg:col-span-2"></div>
      )}
    </div>
  );
};

export default Footer;
