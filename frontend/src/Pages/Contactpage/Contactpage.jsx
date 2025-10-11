import React, { useState } from "react";
import './Contactpage.css';
import Footer from "../../Components/Footer";
import Nav from "../../Components/Nav/Nav";
import axios from "axios";


export default function Contactpage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/contact', formData);
      alert('Thankk UUU for contacting...!!!!!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Message failed', error);
      alert("Error submitting message");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <>
      <Nav />
      <div className="sign-in">
        <form className="contact" onSubmit={handleSubmit}>
          <div className="content">
            <label>Name:</label>
            <input className="contact_input" type="text" name="name" value={name} onChange={handleChange} required />

            <label>Email:</label>
            <input className="contact_input" type="email" name="email" value={email} onChange={handleChange} required />
            <label>Message:</label>
            <textarea className="contact_input" name="message" value={message} onChange={handleChange} required />
          </div>
          <button className='btn1' type="button" onClick={handleCancel}>Cancel</button>
          <button className='btn1' type="submit" >Submit</button>
        </form>
      </div>
      <Footer />
    </>

  );
}
