"use client";

import React from "react";
import styles from './ChessButton.module.css';

const FetchChessTournament = () => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full bg-cover bg-center ${styles.backgroundContainer}`}
      style={{ backgroundImage: "url('https://res.cloudinary.com/diqdg481x/image/upload/v1741511903/chesscom_kqlzon.png')" }}
    >
      <div className="relative flex flex-col items-center w-[95%] md:w-[90%] lg:w-5/6 bg-black/80 p-4 rounded-lg shadow-2xl border-2 border-[#8bbd5181] transform transition-all duration-300 hover:scale-105 hover:border-[#8ABD51] hover:shadow-[#8bbd5181] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.1)_0%,transparent_70%)] animate-pulse-slow"></div>
        
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-orbitron ${styles.customGreen} mb-2 text-center relative z-10 animate-fade-in`}>
          <b>XPECTO’25 CHESS TOURNAMENT</b> <br/> <em>OUTSMART THE GLITCH!</em>
        </h2>

        <p className="text-xs md:text-sm lg:text-base text-gray-200 text-center relative z-10 animate-slide-up leading-tight">
          The board is set, the pieces are in motion, and time itself is unstable—can you think ahead and outplay the chaos? 
          The Xpecto’25 Chess Tournament invites strategic minds to battle it out in a game of intellect, precision, and calculated risks. 
          <br />
          <span className="block mt-1 font-bold">Who Can Join?</span> 
          Open to all chess enthusiasts—students, strategists, and thinkers alike! Sharpen your tactics, embrace the challenge, and prepare for a battle where every move counts.<br/> 
          Will you outmaneuver the glitch and emerge as the grandmaster of Xpecto?
          <br />
          <span className="block mt-1 font-bold">Registration Fee:</span> ₹59 per participant
        </p>

        <div className="flex flex-col items-center mt-12 space-y-1 relative z-10">
          <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm lg:text-base text-gray-300">
            <span>• <span className={styles.customGreen}>March 23, 2025</span></span>
            <span>• <span className={styles.customGreen}>Blitz & Rapid</span></span>
            <span>• <span className={styles.customGreen}>Prize Pool: <i>to be decided</i></span></span>
            <span>• <span className={styles.customGreen}>Platform: Chess.com</span></span>
          </div>
          <div className="flex gap-4 mt-3">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfx4rFZFEKI4hPWk_TStK2jXq7pesLx_NWgDQ6FC37TAoYJrQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" className={styles.registerButton}>
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchChessTournament;