import "./FormStyle.css";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import resume from "../data/resume.json";

// EmailJS identifiers are public by design (they ship in the browser bundle).
const EMAILJS_SERVICE_ID = "service_h6qxglb";
const EMAILJS_TEMPLATE_ID = "template_wvj66mp";
const EMAILJS_PUBLIC_KEY = "U-Oz8OKs0SVb-iAgG";

const Form = () => {
  const form = useRef();
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const { email } = resume.basics;

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus({ state: "sending", message: "Sending..." });
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY).then(
      () => {
        setStatus({ state: "sent", message: "Thanks! Your message has been sent. I'll get back to you soon." });
        form.current.reset();
      },
      () => {
        setStatus({ state: "error", message: `Sorry, the message couldn't be sent. Please email me at ${email}.` });
      }
    );
  };

  return (
    <section className="section contact" aria-labelledby="contact-heading">
      <div className="container">
        <h2 id="contact-heading" className="section-title">
          Send me a message
        </h2>
        <p className="section-subtitle">
          Or email me directly at <a href={`mailto:${email}`}>{email}</a>
        </p>
        <form className="form" ref={form} onSubmit={sendEmail}>
          <label htmlFor="user_name">Your name</label>
          <input id="user_name" type="text" name="user_name" autoComplete="name" required />
          <label htmlFor="user_email">Email</label>
          <input id="user_email" type="email" name="user_email" autoComplete="email" required />
          <label htmlFor="user_subject">Subject</label>
          <input id="user_subject" type="text" name="user_subject" required />
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="6" placeholder="Type your message here" name="message" required />
          <button className="btn" type="submit" disabled={status.state === "sending"}>
            {status.state === "sending" ? "Sending..." : "Send message"}
          </button>
          <p className={`form-status ${status.state}`} role="status" aria-live="polite">
            {status.state === "sending" ? "" : status.message}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Form;
