import "./HeroImgStyle.css";
import React from "react";
import { Link } from "react-router-dom";
import HeroBackground from "../assets/hero.jpg";
import SocialLinks from "./SocialLinks";
import resume from "../data/resume.json";

const HeroImg = () => {
  const { basics } = resume;
  const [role, company] = basics.headline.split(" at ");

  return (
    <section className="hero">
      <div className="mask">
        <img className="intro-img" src={HeroBackground} alt="" />
      </div>
      <div className="content">
        <p className="eyebrow">Hi, I'm {basics.name}</p>
        <h1>
          <span className="hero-role">{role}</span>
          {company && ` at ${company}`}
        </h1>
        <p className="tagline">{basics.tagline}</p>
        <div className="hero-actions">
          <Link to="/resume" className="btn">
            Resume
          </Link>
          <Link to="/contact" className="btn-light">
            Contact
          </Link>
        </div>
        <div className="hero-social">
          <SocialLinks size={26} />
        </div>
      </div>
    </section>
  );
};

export default HeroImg;
