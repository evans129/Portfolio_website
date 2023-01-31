import "./AboutContentStyle.css"

import React from 'react'
import { Link } from "react-router-dom"

const AboutContent = () => {
  return (
    <div className="about">
        <div className="about-details">
         <h1>Who am I?</h1>
         <p>Im a Software Developer</p>
         <Link to="/contact">
            <button className="btn">Contact</button>
         </Link>
        </div>
    </div>
  )
}

export default AboutContent