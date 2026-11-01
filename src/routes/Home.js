import React from "react";
import Navbar from "../components/Navbar";
import HeroImg from "../components/HeroImg";
import Highlights from "../components/Highlights";
import Experience from "../components/Experience";
import Work from "../components/Work";
import Footer from "../components/Footer";
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  usePageTitle();
  return (
    <>
      <Navbar />
      <main>
        <HeroImg />
        <Highlights />
        <div className="section-alt">
          <Experience compact />
        </div>
        <Work featuredOnly />
      </main>
      <Footer />
    </>
  );
};

export default Home;
