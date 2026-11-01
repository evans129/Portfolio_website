import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImg2 from "../components/HeroImg2";
import { AboutExtras, AboutIntro } from "../components/AboutContent";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import usePageTitle from "../hooks/usePageTitle";

const About = () => {
  usePageTitle("About");
  return (
    <>
      <Navbar />
      <main>
        <HeroImg2 heading="ABOUT" text="Software Engineer II at Microsoft" />
        <AboutIntro />
        <div className="section-alt">
          <Experience />
        </div>
        <Skills />
        <AboutExtras />
      </main>
      <Footer />
    </>
  );
};

export default About;
