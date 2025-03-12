"use client";

import React from "react";
import styles from './ValorantButton.module.css';

const FetchValorantTournament = () => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full bg-cover bg-center ${styles.backgroundContainer}`}
      style={{ backgroundImage: "url('https://res.cloudinary.com/diqdg481x/image/upload/v1741510741/China_CG_phxcool_fullres_zp7tye.jpg')" }}
    >
      <div className="relative flex flex-col items-center w-[95%] md:w-[90%] lg:w-5/6 bg-black/80 p-4 rounded-lg shadow-2xl border-2 border-[#ff465685] transform transition-all duration-300 hover:scale-105 hover:border-[#FF4655] hover:shadow-[#ff465685] overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1)_0%,transparent_70%)] animate-pulse-slow"></div>
        
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-orbitron ${styles.customRed} mb-2 text-center relative z-10 animate-fade-in`}>
          <b>VALORANT CHAMPIONSHIP</b> <br/> <em>AIM. SHOOT. DOMINATE.</em>
        </h2>

        <p className="text-sm lg:text-base text-gray-200 text-center relative z-10 animate-slide-up leading-tight">
          The battleground is set, the stakes are high, and only the best will emerge victorious. Xpecto’25 Valorant Championship is your chance to prove your skills, outplay your opponents, and compete for a ₹60,000 prize pool.
          Lock in your squad, sharpen your aim, and prepare for intense, high-stakes combat. Do you have what it takes to rise above the rest?
          <br />
          <span className="block mt-1 font-bold">Participation Fee:</span> ₹99 per player
          <br />
          <span className="block mt-1 font-bold">Team Registration Fee:</span> ₹495
          <br />
          <span className="block mt-1 font-bold">Registration Deadline:</span> 25th March 2025
        </p>

        <div className="flex flex-col items-center mt-12 space-y-1 relative z-10">
          <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm lg:text-base text-gray-300">
            <span>• <span className={styles.customRed}>27-28 March 2025</span></span>
            <span>• <span className={styles.customRed}>5v5</span></span>
            <span>• <span className={styles.customRed}>Prize Pool: ₹60,000</span></span>
            <span>• <span className={styles.customRed}>Platform: Valorant</span></span>
          </div>
          <div className="flex gap-4 mt-3">
            <a href="https://forms.gle/T543EvxuhqWBdcBy8" target="_blank" rel="noopener noreferrer" className={styles.registerButton}>
              Register Now
            </a>
            <a href="https://discord.gg/zDrHYBSC" target="_blank" rel="noopener noreferrer" className={styles.discordButton}>
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchValorantTournament;