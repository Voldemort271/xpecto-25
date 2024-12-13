import React from "react";
import styles from "./marquee.module.css";
import Link from "next/link";

interface Props {
  text: string[];
  href?: string;
  onclick?: () => void;
}

const MarqueeContainer = ({ text, href, onclick }: Props) => {
  const text2 = text.concat(text).join(" | ").concat(" | ");
  return href ? (
    <Link className="flex items-center" href={href} onClick={onclick}>
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
