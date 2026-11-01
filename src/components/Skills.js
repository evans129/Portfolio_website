import "./SkillsStyle.css";
import React from "react";
import resume from "../data/resume.json";

const Skills = () => (
  <section className="section section-alt" aria-labelledby="skills-heading">
    <div className="container">
      <h2 id="skills-heading" className="section-title">
        Skills
      </h2>
      <p className="section-subtitle">Languages, platforms, and tools I use day to day</p>
      <div className="skills-grid">
        {resume.skills.map(({ category, items }) => (
          <div className="skill-group card" key={category}>
            <h3>{category}</h3>
            <ul className="chips">
              {items.map((item) => (
                <li className="chip" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
