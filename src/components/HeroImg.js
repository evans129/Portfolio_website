import "./HeroImgStyle.css";

import React from 'react'
import IntroImg from "../assets/intro.jpg"
import { Link } from "react-router-dom";

const HeroImg = () => {
  return (
    <div className="hero">
        <div className="mask">
            <img className="intro-img" src={IntroImg} alt="IntroImg"></img>
        </div>
        <div className="content">
          <p> Hi! I am Devansh</p>
          <h1>Software Developer</h1>
          <div>
          <Link to="/project"><button className="btn">Projects</button></Link>
            <Link to="/contact"><button className="btn-light">Contact</button></Link>
          </div>
        </div>
    </div>
  )
}

export default HeroImg