import "./ContactOptionsStyle.css";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import resume from "../data/resume.json";

const channels = {
  LinkedIn: {
    Icon: FaLinkedin,
    title: "Message me on LinkedIn",
    text: "The best way to reach me about roles, collaborations, or questions.",
  },
  GitHub: {
    Icon: FaGithub,
    title: "Browse my GitHub",
    text: "Source code for the projects and apps on this site.",
  },
};

const ContactOptions = () => {
  const { basics } = resume;
  const profiles = basics.links.filter((link) => channels[link.label]);

  return (
    <section className="section contact" aria-labelledby="contact-heading">
      <div className="container">
        <h2 id="contact-heading" className="section-title">
          Let's connect
        </h2>
        <p className="section-subtitle">
          Based in {basics.location} · {basics.relocation}
        </p>
        <ul className="contact-options">
          {profiles.map(({ label, url, display }) => {
            const { Icon, title, text } = channels[label];
            return (
              <li key={label}>
                <a className="card contact-card" href={url} target="_blank" rel="noopener noreferrer">
                  <Icon className="contact-icon" size={36} aria-hidden="true" />
                  <span className="contact-title">{title}</span>
                  <span className="muted">{text}</span>
                  <span className="contact-handle">{display}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ContactOptions;
