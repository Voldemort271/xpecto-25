import styles from "@/styles/loader.module.css";
import React from 'react';
import { Handjet } from "next/font/google";


const handjet = Handjet({ subsets: ["latin"] });

const Loader = () => {
  return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
        <div className= {`${styles.glitch_container} ${handjet.className}`}>
          <div 
            className={`text-7xl ${styles.glitch_text} ${styles.loading_effect}`} 
            data-text="XPECTO"
          >
            XPECTO
          </div>
        </div>
      </div>
  );
};

export default Loader;