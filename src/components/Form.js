import "./FormStyle.css"

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


const Form = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_h6qxglb', 'template_wvj66mp', form.current, 'U-Oz8OKs0SVb-iAgG')
      .then((result) => {
          console.log(result.text);
          console.log("message sent");
          alert("Message Successfully sent!");
          e.target.reset();
      }, (error) => {
          console.log(error.text);
          alert("Message not sent!");
      });
  };

  return (
    <div className="form">
        <form ref={form} onSubmit={sendEmail}>
            <label >Your Name</label>
            <input type="text" name="user_name"></input>
            <label>Email</label>
            <input type="email" name="user_email"></input>
            <label>Subject</label>
            <input type="text" name="user_subject"></input>
            <label>Message</label>
            <textarea rows='6' placeholder="Type Your Message Here" name="message"></textarea>
            <button className="btn">Submit</button>
        </form>
    </div>
  )
}

export default Form