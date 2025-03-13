"use client";

import React from "react";
import styles from "./ChessButton.module.css";

import { Share_Tech } from "next/font/google";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const FetchChessTournament = () => {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center bg-cover bg-center ${styles.backgroundContainer}`}
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/diqdg481x/image/upload/v1741511903/chesscom_kqlzon.png')",
      }}
    >
      <div className="relative flex w-[95%] transform flex-col items-center overflow-hidden rounded-lg border-2 border-[#8bbd5181] bg-black/80 p-4 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-[#8ABD51] hover:shadow-[#8bbd5181] md:w-[90%] lg:w-5/6">
        <div className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.1)_0%,transparent_70%)]"></div>

        <h2
          className={`font-orbitron text-3xl md:text-4xl lg:text-5xl ${styles.customGreen} animate-fade-in relative z-10 mb-2 text-center`}
        >
          <b>XPECTO’25 CHESS TOURNAMENT</b> <br /> <em>OUTSMART THE GLITCH!</em>
        </h2>

        <p
          className={`animate-slide-up relative z-10 text-center text-xs leading-tight text-gray-200 md:text-sm lg:text-base ${shareTech.className} tracking-tight`}
        >
          The board is set, the pieces are in motion, and time itself is
          unstable—can you think ahead and outplay the chaos? The Xpecto’25
          Chess Tournament invites strategic minds to battle it out in a game of
          intellect, precision, and calculated risks.
          <br />
          <span className="mt-1 block font-bold">Who Can Join?</span>
          Open to all chess enthusiasts—students, strategists, and thinkers
          alike! Sharpen your tactics, embrace the challenge, and prepare for a
          battle where every move counts.
          <br />
          Will you outmaneuver the glitch and emerge as the grandmaster of
          Xpecto?
          <br />
          <span className="mt-1 block font-bold">Registration Fee:</span> ₹59
          per participant
        </p>

        <div className="relative z-10 mt-12 flex flex-col items-center space-y-1">
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-300 md:text-sm lg:text-base">
            <span>
              • <span className={styles.customGreen}>March 23, 2025</span>
            </span>
            <span>
              • <span className={styles.customGreen}>Blitz & Rapid</span>
            </span>
            <span>
              •{" "}
              <span className={styles.customGreen}>
                Prize Pool: <i>to be decided</i>
              </span>
            </span>
            <span>
              • <span className={styles.customGreen}>Platform: Chess.com</span>
            </span>
          </div>
          <div className="mt-3 flex gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfx4rFZFEKI4hPWk_TStK2jXq7pesLx_NWgDQ6FC37TAoYJrQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.registerButton}
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchChessTournament;
