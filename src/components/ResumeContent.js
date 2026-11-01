import "./ResumeContentStyle.css";
import React, { useState } from "react";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import resume from "../data/resume.json";
import resumeFiles from "../data/resume-files.json";

const FILES_URL = `${process.env.PUBLIC_URL}/files`;

const versions = [
  {
    id: "one",
    title: "Resume",
    description: "Concise, ATS-friendly version for job applications.",
  },
  {
    id: "two",
    title: "Detailed resume",
    description: "Every project, plus leadership, side projects, and awards.",
  },
].map((version) => ({ ...version, ...resumeFiles[version.id] }));

const pageLabel = (count) => `${count} ${count === 1 ? "page" : "pages"}`;

const ResumeContent = () => {
  const [previewId, setPreviewId] = useState(versions[0].id);
  const preview = versions.find((v) => v.id === previewId);

  return (
    <section className="section" aria-labelledby="resume-heading">
      <div className="container">
        <h2 id="resume-heading" className="section-title">
          Download my resume
        </h2>
        <p className="section-subtitle">Last updated {resume.updated}. Both versions are plain, single-column PDFs.</p>
        <div className="resume-cards">
          {versions.map((v) => (
            <article key={v.id} className={`resume-card card${v.id === previewId ? " selected" : ""}`}>
              <h3>
                {v.title} <span className="muted">({pageLabel(v.pages.length)})</span>
              </h3>
              <p className="muted">{v.description}</p>
              <div className="resume-actions">
                <a className="btn btn-small" href={`${FILES_URL}/${v.pdf}`} download>
                  <FaDownload aria-hidden="true" /> Download
                </a>
                <a className="btn-light btn-small" href={`${FILES_URL}/${v.pdf}`} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt aria-hidden="true" /> Open
                </a>
                <button
                  type="button"
                  className="btn-light btn-small"
                  aria-pressed={v.id === previewId}
                  aria-controls="resume-preview"
                  onClick={() => setPreviewId(v.id)}
                >
                  Preview
                </button>
              </div>
            </article>
          ))}
        </div>
        <div id="resume-preview" className="resume-preview" aria-live="polite">
          {preview.pages.map((page, index) => (
            <a key={page} href={`${FILES_URL}/${preview.pdf}`} target="_blank" rel="noopener noreferrer">
              <img
                src={`${FILES_URL}/${page}`}
                alt={`${preview.title}, page ${index + 1} of ${preview.pages.length}`}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeContent;
