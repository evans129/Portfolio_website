import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImg2 from "../components/HeroImg2";
import usePageTitle from "../hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("Page not found");
  return (
    <>
      <Navbar />
      <main>
        <HeroImg2 heading="404" text="This page doesn't exist." />
        <div className="section center">
          <Link to="/" className="btn">
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
