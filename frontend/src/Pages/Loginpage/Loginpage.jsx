import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Loginpage.css'

export default function Loginpage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const LoginUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', {
        email: email,
        password: password
      });

      console.log(response.data.data)
      localStorage.setItem('userLogged', JSON.stringify(response.data.data))
      alert("Login successful")
      navigate('/home')
    } catch (error) {
      alert("Invalid email or password, Please try again later!!")
    }
  }

  const handleCancel = () => {
    setEmail("")
    setPassword("")
    navigate(-1) // This will navigate back to the previous page
  }

  return (
    <div className='sign-in'>
      <form className='login'>
        <header className="header1">
          <center>
            <h1 id="h1">Login</h1>
            <p id="p1">Please login to existing account</p>
          </center>
        </header>
        <hr />
        <div className="content">
          <label>Email:</label>
          <input className='log_input' type="email" placeholder="Enter your Email:" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input className='log_input' type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="div_btn">
            <button type="button" onClick={handleCancel} className="btn1">Cancel</button>
            <button className="btn1" onClick={LoginUser} type="submit">Login</button><br /><br />
          </div>
          <div className="login-link">
            <center>Create a new account <Link to="/register">Register</Link></center>
          </div>
        </div>
      </form>
    </div>
  )
}
