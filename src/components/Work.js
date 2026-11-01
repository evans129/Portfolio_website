import "./WorkCardStyle.css";
import React from "react";
import { Link } from "react-router-dom";
import WorkCard from "./WorkCard";
import WorkCardData from "./WorkCardData";

const Work = ({ featuredOnly = false }) => {
  const projects = featuredOnly ? WorkCardData.filter((p) => p.featured) : WorkCardData;

  return (
    <section className="section work-container" aria-labelledby="projects-heading">
      <div className="container">
        <h2 id="projects-heading" className="section-title">
          {featuredOnly ? "Featured projects" : "Projects"}
        </h2>
        <p className="section-subtitle">
          Personal and university projects in machine learning, computer vision, and web development
        </p>
        <div className="project-container">
          {projects.map((project) => (
            <WorkCard key={project.title} {...project} />
          ))}
        </div>
        {featuredOnly && (
          <div className="center work-more">
            <Link to="/project" className="btn-light">
              All projects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;
