import React from "react";
import "./index.css";
import Home from "./routes/Home";
import About from "./routes/About";
import Project from "./routes/Project";
import Resume from "./routes/Resume";
import Contact from "./routes/Contact";
import NotFound from "./routes/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { Route, Routes } from "react-router-dom";

// Keep in sync with scripts/postbuild.js, which pre-renders a page per route for GitHub Pages.
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
