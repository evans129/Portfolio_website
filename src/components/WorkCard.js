import "./WorkCardStyle.css";
import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const WorkCard = ({ imgsrc, title, text, tags = [], view, source }) => (
  <article className="project-card card">
    <div className="project-thumb">
      <img src={imgsrc} alt={`Screenshot of ${title}`} loading="lazy" />
    </div>
    <div className="project-body">
      <h3 className="project-title">{title}</h3>
      <p className="project-text">{text}</p>
      {tags.length > 0 && (
        <ul className="chips" aria-label="Technologies">
          {tags.map((tag) => (
            <li className="chip" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}
      <div className="pro-btns">
        <a className="btn btn-small" href={view} target="_blank" rel="noopener noreferrer">
          <FaExternalLinkAlt aria-hidden="true" /> Live
        </a>
        <a className="btn-light btn-small" href={source} target="_blank" rel="noopener noreferrer">
          <FaGithub aria-hidden="true" /> Source
        </a>
      </div>
    </div>
  </article>
);

export default WorkCard;
