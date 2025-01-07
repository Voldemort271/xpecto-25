"use client";

import React from "react";
const Loader = () => {
  return (
    <div className="overlay">
      <img
        className="loader"
        src="/loading.gif"
        width="190rem"
        height="190rem"
      ></img>
    </div>
  );
};

export default Loader;
