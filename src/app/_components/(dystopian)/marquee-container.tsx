import React from "react";
import styles from "./marquee.module.css";

interface Props {
  text: string[];
}

const MarqueeContainer = ({ text }: Props) => {
  const text2 = text.concat(text).join(" | ");
  return (
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
