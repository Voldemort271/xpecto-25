import styles from "@/styles/loader.module.css";
import React from 'react';
import { Handjet } from "next/font/google";


const handjet = Handjet({ subsets: ["latin"] });

const Loader = ({loadingText} : {loadingText: string}) => {
  return (
      <div className="fixed w-full h-full bg-opacity-85 bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
        <div className= {`${styles.glitch_container} ${handjet.className}`}>
          <div 
            className={`text-7xl ${styles.glitch_text} ${styles.loading_effect}`} 
            data-text="XPECTO"
          >
            XPECTO
          </div>
        </div>
        {loadingText && <div className={`text-white text-center text-md font-bold mt-3 ${styles.glitch_side_text}`}>{loadingText}</div>}
      </div>
  );
};

export default Loader;