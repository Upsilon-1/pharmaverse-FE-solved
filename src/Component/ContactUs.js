import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactUs.css';
import { useRef } from 'react';
import { Button } from '@mui/base';
import { redirect } from "react-router-dom";

function ContactUs() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [messageText, setMessageText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(form.current);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      emailjs.send('service_t6g2fxo', 'template_u0u4xsd', data, 'WI0ipn0iPaCYThAjY')
        .then((result) => {
          console.log(result.text);
        });
      setSent(true);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleMessageChange = (event) => {
    setMessageText(event.target.value);
  };

  return (
    <>
      <div className={`wrapper1 ${sent ? 'sent' : ''}`}>
        <form ref={form} className="letter1" style={{ marginTop: "5rem" }} onSubmit={handleSend}>
          <div className="side side-one1">
            <h1 className='h11' style={{ color: 'black' }}>Contact us</h1>
            <p>
              <textarea className='textarea1' placeholder="Your message" value={messageText} onChange={handleMessageChange} name='message'></textarea>
            </p>
          </div>
          <div className="side side-two1">
            <p>
              <input className='input1' type="text" placeholder="Your name" name="from_name" />
            </p>
            <p>
              <input className='input1' type="email" placeholder="Your email" name='from_email' />
            </p>
            <p>
              <button className='button1' id="sendLetter" value="Send" type='submit'>Send</button>
            </p>
          </div>
        </form>
        <div className="envelope front1"></div>
        <div className="envelope back1"></div>
      </div>
      {sent && <p className="result-message centered1">Thank you for your message
        <br /><div>Want to Send More Reviews?<Button style={{ cursor: "pointer" }} onClick={() => window.location.reload(false)} ><span>Click Here</span></Button></div></p>}
    </>
  );
}

export default ContactUs;
