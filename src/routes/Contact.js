import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImg2 from "../components/HeroImg2";
import Form from "../components/Form";
import usePageTitle from "../hooks/usePageTitle";

const Contact = () => {
  usePageTitle("Contact");
  return (
    <>
      <Navbar />
      <main>
        <HeroImg2 heading="CONTACT" text="Let's have a chat" />
        <Form />
      </main>
      <Footer />
    </>
  );
};

export default Contact;
