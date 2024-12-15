"use client";

import React, { useContext } from "react";
import styles from "@/styles/marquee.module.css";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";

interface Props {
  text: string[];
  href?: string;
  onclick?: () => void;
}

const MarqueeContainer = ({ text, href, onclick }: Props) => {
  const { isHovered, setIsHovered } = useContext(CursorContext);
  const text2 = text.concat(text).join(" | ").concat(" | ");

  return href ? (
    <Link
      className="flex cursor-none items-center"
      href={href}
      onClick={onclick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.marquee}>
        <span>{text2}&nbsp;</span>
      </div>
      <div className={`${styles.marquee} ${styles.marquee2}`}>
        <span>{text2}&nbsp;</span>
      </div>
    </Link>
  ) : (
    <>
      <div className={styles.marquee}>
        <span>{text2}&nbsp;</span>
      </div>
      <div className={`${styles.marquee} ${styles.marquee2}`}>
        <span>{text2}&nbsp;</span>
      </div>
    </>
  );
};

export default MarqueeContainer;
