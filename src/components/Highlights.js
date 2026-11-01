import "./HighlightsStyle.css";
import React from "react";
import resume from "../data/resume.json";

const Highlights = () => (
  <section className="section highlights" aria-labelledby="impact-heading">
    <div className="container">
      <h2 id="impact-heading" className="section-title">
        Impact
      </h2>
      <p className="section-subtitle">A few results from my work at Microsoft</p>
      <ul className="stats">
        {resume.highlights.map(({ value, label }) => (
          <li className="stat card" key={value}>
            <span className="stat-value gradient-text">{value}</span>
            <p className="stat-label">{label}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Highlights;
