import "./AboutContentStyle.css";
import React from "react";
import { Link } from "react-router-dom";
import resume from "../data/resume.json";

const websiteItems = (items = []) => items.filter((item) => (item.variants || ["one", "two"]).includes("two"));

export const AboutIntro = () => {
  const { basics } = resume;
  return (
    <section className="section about-intro" aria-labelledby="about-heading">
      <div className="container about-details">
        <h2 id="about-heading" className="section-title">
          Who am I?
        </h2>
        <p className="about-summary">{basics.summary}</p>
        <p className="muted">
          Based in {basics.location} · {basics.relocation}
        </p>
        <div className="about-actions">
          <Link to="/resume" className="btn">
            Resume
          </Link>
          <Link to="/contact" className="btn-light">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
};

export const AboutExtras = () => {
  const leadership = websiteItems(resume.leadership);
  const awards = websiteItems(resume.awards);

  return (
    <section className="section" aria-label="Leadership, awards, and education">
      <div className="container about-extras">
        <article className="card about-card">
          <h3>Leadership and mentorship</h3>
          <ul className="about-list">
            {leadership.map((item) => (
              <li key={item.text}>{item.text}</li>
            ))}
          </ul>
        </article>
        <article className="card about-card">
          <h3>Awards</h3>
          <ul className="about-list">
            {awards.map((item) => (
              <li key={item.text}>{item.text}</li>
            ))}
          </ul>
          <h3 className="about-subheading">Education</h3>
          {resume.education.map((school) => (
            <div className="education" key={school.school}>
              <p className="education-school">{school.school}</p>
              <p>{school.degree}</p>
              <p className="muted">
                {school.start} – {school.end} · {school.detail}
              </p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
};
