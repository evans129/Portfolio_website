import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImg2 from "../components/HeroImg2";
import Work from "../components/Work";
import usePageTitle from "../hooks/usePageTitle";

const Project = () => {
  usePageTitle("Projects");
  return (
    <>
      <Navbar />
      <main>
        <HeroImg2 heading="PROJECTS" text="Things I've built outside of work" />
        <Work />
      </main>
      <Footer />
    </>
  );
};

export default Project;
