import "./FooterStyle.css";
import React from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import SocialLinks from "./SocialLinks";
import resume from "../data/resume.json";

const Footer = () => {
  const { basics } = resume;

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <h4>{basics.name}</h4>
          <p>{basics.tagline}</p>
          <ul className="footer-contact">
            <li>
              <FaMapMarkerAlt aria-hidden="true" />
              <span>
                {basics.location} · {basics.relocation}
              </span>
            </li>
            <li>
              <FaEnvelope aria-hidden="true" />
              <a href={`mailto:${basics.email}`}>{basics.email}</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Find me online</h4>
          <SocialLinks size={28} />
        </div>
      </div>
      <p className="copyright">
        © {new Date().getFullYear()} {basics.name}
      </p>
    </footer>
  );
};

export default Footer;
