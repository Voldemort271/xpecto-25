"use client";

import React, { useContext } from "react";
import styles from "@/styles/marquee.module.css";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";

interface Props {
  text: string[];
  href?: string;
  onclick?: () => void;
  delay?: number;
  cursor?: true;
}

const MarqueeContainer = ({ text, href, onclick, delay, cursor }: Props) => {
  const { setIsHovered } = useContext(CursorContext);
  const text2 = text.concat(text).join(" | ").concat(" | ");

  return href ? (
    <Link
      className={`flex items-center ${cursor ? "cursor-pointer" : "cursor-none"} select-none`}
      href={href}
      onClick={onclick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={styles.marquee}
        style={{ animationDelay: `${delay ? delay : 0}s` }}
      >
        <span style={{ animationDelay: `${delay ? delay - 25 : -25}s` }}>
          {text2}&nbsp;
        </span>
      </div>
      <div
        className={`${styles.marquee} ${styles.marquee2}`}
        style={{ animationDelay: `${delay ? delay : 0}s` }}
      >
        <span style={{ animationDelay: `${delay ? delay : 0}s` }}>
          {text2}&nbsp;
        </span>
      </div>
    </Link>
  ) : (
    <>
      <div
        className={`${styles.marquee} select-none`}
        style={{ animationDelay: `${delay ? delay : 0}s` }}
      >
        <span style={{ animationDelay: `${delay ? delay - 25 : -25}s` }}>
          {text2}&nbsp;
        </span>
      </div>
      <div
        className={`${styles.marquee} ${styles.marquee2} select-none`}
        style={{ animationDelay: `${delay ? delay : 0}s` }}
      >
        <span style={{ animationDelay: `${delay ? delay : 0}s` }}>
          {text2}&nbsp;
        </span>
      </div>
    </>
  );
};

export default MarqueeContainer;
