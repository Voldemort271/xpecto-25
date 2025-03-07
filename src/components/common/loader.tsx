import styles from "@/styles/loader.module.css";
import React from "react";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });

const Loader = ({ loadingText }: { loadingText?: string }) => {
  return (
    <div className="fixed z-0 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-opacity-85">
      <div className={`${styles.glitch_container} ${handjet.className}`}>
        <div
          className={`text-7xl ${styles.glitch_text} ${styles.loading_effect}`}
          data-text="XPECTO"
        >
          XPECTO
        </div>
      </div>
      {loadingText && (
        <div
          className={`text-md mt-3 text-center font-bold text-white ${styles.glitch_side_text}`}
        >
          {loadingText}
        </div>
      )}
    </div>
  );
};

export default Loader;
