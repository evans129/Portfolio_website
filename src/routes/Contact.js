import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImg2 from "../components/HeroImg2";
import ContactOptions from "../components/ContactOptions";
import usePageTitle from "../hooks/usePageTitle";

const Contact = () => {
  usePageTitle("Contact");
  return (
    <>
      <Navbar />
      <main>
        <HeroImg2 heading="CONTACT" text="Let's have a chat" />
        <ContactOptions />
      </main>
      <Footer />
    </>
  );
};

export default Contact;
