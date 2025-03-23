"use client";

import React from "react";
import styles from "./ValorantButton.module.css";
import { Share_Tech } from "next/font/google";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const FetchValorantTournament = () => {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center bg-cover bg-center ${styles.backgroundContainer}`}
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/djzzlkekc/image/upload/v1742710861/China_CG_phxcool_fullres_zp7tye_tkies5_1_f0zzgp.jpg')",
      }}
    >
      <div className="relative flex w-[95%] transform flex-col items-center overflow-hidden rounded-lg border-2 border-[#ff465685] bg-black/80 p-4 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-[#FF4655] hover:shadow-[#ff465685] md:w-[90%] lg:w-5/6">
        <div className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1)_0%,transparent_70%)]"></div>

        <h2
          className={`font-orbitron text-3xl md:text-4xl lg:text-5xl ${styles.customRed} animate-fade-in relative z-10 mb-2 text-center`}
        >
          <b>VALORANT CHAMPIONSHIP</b> <br /> <em>AIM. SHOOT. DOMINATE.</em>
        </h2>

        <p
          className={`animate-slide-up relative z-10 text-center text-sm leading-tight text-gray-200 lg:text-base ${shareTech.className} tracking-tight`}
        >
          The battleground is set, the stakes are high, and only the best will
          emerge victorious. Xpecto’25 Valorant Championship is your chance to
          prove your skills, outplay your opponents, and compete for a ₹60,000
          prize pool. Lock in your squad, sharpen your aim, and prepare for
          intense, high-stakes combat. Do you have what it takes to rise above
          the rest?
          <br />
          <span className="mt-1 block font-bold">Participation Fee:</span> ₹99
          per player
          <br />
          <span className="mt-1 block font-bold">
            Team Registration Fee:
          </span>{" "}
          ₹495
          <br />
          <span className="mt-1 block font-bold">
            Registration Deadline:
          </span>{" "}
          25th March 2025
        </p>

        <div className="relative z-10 mt-12 flex flex-col items-center space-y-1">
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-300 md:text-sm lg:text-base">
            <span>
              • <span className={styles.customRed}>27-28 March 2025</span>
            </span>
            <span>
              • <span className={styles.customRed}>5v5</span>
            </span>
            <span>
              • <span className={styles.customRed}>Prize Pool: ₹60,000</span>
            </span>
            <span>
              • <span className={styles.customRed}>Platform: Valorant</span>
            </span>
          </div>
          <div className="mt-3 flex gap-4">
            <a
              href="https://forms.gle/T543EvxuhqWBdcBy8"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.registerButton}
            >
              Register Now
            </a>
            <a
              href="https://discord.gg/zDrHYBSC"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discordButton}
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchValorantTournament;
