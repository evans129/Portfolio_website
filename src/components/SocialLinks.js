import "./SocialLinksStyle.css";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import resume from "../data/resume.json";

const icons = { LinkedIn: FaLinkedin, GitHub: FaGithub };

const SocialLinks = ({ size = 24 }) => {
  const profiles = resume.basics.links.filter((link) => icons[link.label]);

  return (
    <ul className="social-links">
      {profiles.map(({ label, url }) => {
        const Icon = icons[label];
        return (
          <li key={label}>
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
              <Icon size={size} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
