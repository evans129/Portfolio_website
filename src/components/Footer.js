import "./FooterStyle.css"
import  {FaHome,FaPhone,FaMailBulk,FaLinkedin,FaGithub} from "react-icons/fa";

import React from 'react'

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-container">
        <div className="left">
        <div className="location">
            <FaHome size={20} style={{color:"white",marginRight: "2rem"}}></FaHome>
            <div>
                <p>KHELGAON</p>
                <p>RANCHI</p>
            </div>
        </div>
        <h4> 
        <div className="phone">
        <FaPhone size={20} style={{color:"white",marginRight: "2rem"}}></FaPhone>
       9110998827
        </div>
        </h4>
        <h4> 
        <div className="email">
        <FaMailBulk size={20} style={{color:"white",marginRight: "2rem"}}></FaMailBulk>
       devanshkumaravi@gmail.com
        </div>
        </h4>
        </div>
        <div className="right">
            <h4>
                About Me
            </h4>
            <p>This is me Devansh aspiring Software Developer and Machine learning enthusiast.</p>
            <div className="social">
           <a href="https://linkedin.com/in/devansh-kumar-a51322213"><FaLinkedin size={30} style={{color:"white",marginRight: "2rem"}}></FaLinkedin></a>
           <a href="https://github.com/evans129" ><FaGithub size={30} style={{color:"white",marginRight: "2rem"}}></FaGithub></a>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Footer