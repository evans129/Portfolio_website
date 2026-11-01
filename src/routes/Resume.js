import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImg2 from "../components/HeroImg2";
import ResumeContent from "../components/ResumeContent";
import usePageTitle from "../hooks/usePageTitle";

const Resume = () => {
  usePageTitle("Resume");
  return (
    <>
      <Navbar />
      <main>
        <HeroImg2 heading="RESUME" text="ATS-friendly PDFs, ready to download" />
        <ResumeContent />
      </main>
      <Footer />
    </>
  );
};

export default Resume;
