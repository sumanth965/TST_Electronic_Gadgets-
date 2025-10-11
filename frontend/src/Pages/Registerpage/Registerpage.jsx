import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Registerpage.css'

export default function Registerpage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/register', {
        email: email,
        password: password,
        name: name
      });

      console.log(response);
      navigate('/');
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword(""); // Clear confirm password field
  };

  return (
    <div className="sign-in">
      <form className="register">
        <header className="header1">
          <center>
            <h1 className="h1">Sign in</h1>
            <p className="p1">Please fill in this form to create an account</p>
          </center>
        </header>
        <hr />
        <div className="content">
          <label>Name</label>
          <input className="reg_input" type="text" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Email</label>
          <input className="reg_input" type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input className="reg_input" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Confirm Password</label>
          <input className="reg_input" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="div_btn">
          <button type="submit" onClick={handleCancel} className="btn1">Refresh</button>
          <button className="btn1" onClick={RegisterUser} type="submit">Register</button>
        </div>
        <div className="login-link">
          <center>Already have an account? <Link to='/'>Login</Link></center>
        </div>
      </form>
    </div>
  );
}
