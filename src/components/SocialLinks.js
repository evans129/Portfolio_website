import "./SocialLinksStyle.css";
import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import resume from "../data/resume.json";

const icons = { LinkedIn: FaLinkedin, GitHub: FaGithub, LeetCode: SiLeetcode };

const SocialLinks = ({ size = 24 }) => {
  const { email, links } = resume.basics;
  const profiles = links.filter((link) => icons[link.label]);

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
      <li>
        <a href={`mailto:${email}`} aria-label="Email" title="Email">
          <FaEnvelope size={size} aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
};

export default SocialLinks;
