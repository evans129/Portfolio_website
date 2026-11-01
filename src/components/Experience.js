import "./ExperienceStyle.css";
import React from "react";
import { Link } from "react-router-dom";
import resume from "../data/resume.json";

// The website shows the detailed ("two") variant of each bullet; compact mode keeps the first few.
const websiteBullets = (bullets) => bullets.filter((b) => (b.variants || ["one", "two"]).includes("two"));

const Experience = ({ compact = false }) => (
  <section className="section experience" aria-labelledby="experience-heading">
    <div className="container">
      <h2 id="experience-heading" className="section-title">
        Experience
      </h2>
      <p className="section-subtitle">
        {compact
          ? "What I've been building at Microsoft"
          : "Platforms, product features, and AI tooling I've built at Microsoft"}
      </p>
      <ol className="timeline">
        {resume.experience.map((job) => (
          <li className="job" key={job.roles.map((r) => r.title).join("|")}>
            <div className="job-header">
              <h3 className="job-company">{job.company}</h3>
              <span className="muted">{job.location}</span>
            </div>
            <ul className="job-roles">
              {job.roles.map((role) => (
                <li key={role.title}>
                  <span className="job-title">{role.title}</span>
                  <span className="muted">
                    {role.start} – {role.end}
                  </span>
                </li>
              ))}
            </ul>
            <div className="job-groups">
              {job.groups.map((group) => {
                const bullets = websiteBullets(group.bullets);
                const shown = compact ? bullets.slice(0, 2) : bullets;
                return (
                  <article className="group card" key={group.name}>
                    <div className="group-header">
                      <h4>{group.name}</h4>
                      {group.start && (
                        <span className="muted group-years">
                          {group.start} – {group.end}
                        </span>
                      )}
                    </div>
                    <p className="group-context">{group.context}</p>
                    <ul className="group-bullets">
                      {shown.map((b) => (
                        <li key={b.text}>{b.text}</li>
                      ))}
                    </ul>
                    {group.tech && (
                      <ul className="chips" aria-label="Technologies">
                        {group.tech.map((t) => (
                          <li className="chip" key={t}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      {compact && (
        <div className="center experience-more">
          <Link to="/about" className="btn-light">
            Full experience
          </Link>
        </div>
      )}
    </div>
  </section>
);

export default Experience;
