import "./HeroImg2Style.css";
import React from "react";

const HeroImg2 = ({ heading, text }) => (
  <div className="hero-img">
    <div className="heading">
      <h1>{heading}</h1>
      {text && <p>{text}</p>}
    </div>
  </div>
);

export default HeroImg2;
