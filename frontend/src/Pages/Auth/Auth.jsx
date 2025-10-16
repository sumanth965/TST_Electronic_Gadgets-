import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    // Toggle Panel
    const handleSignUpClick = () => setIsRightPanelActive(true);
    const handleSignInClick = () => setIsRightPanelActive(false);

    // Email validation regex for Gmail only
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!emailPattern.test(email)) {
            alert("Please enter a valid Gmail address.");
            return;
        }

        try {
            const response = await axios.post("https://tst-electronic-gadgets-su-manth09-backend.onrender.com/api/v1/user/login", {
                email: email,
                password: password
            });
            localStorage.setItem("userLogged", JSON.stringify(response.data.data));
            alert("Login successful");
            navigate("/home");
        } catch (error) {
            alert("Invalid email or password. Please try again!");
        }
    };

    // Handle Registration
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!emailPattern.test(email)) {
            alert("Please enter a valid Gmail address.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("https://tst-electronic-gadgets-su-manth09-backend.onrender.com/api/v1/user/register", {
                email: email,
                password: password,
                name: name
            });
            alert("Registration successful");

            // Automatically login after registration
            const loginResponse = await axios.post("https://tst-electronic-gadgets-su-manth09-backend.onrender.com/api/v1/user/login", {
                email: email,
                password: password
            });

            localStorage.setItem("userLogged", JSON.stringify(loginResponse.data.data));
            alert("Login successful");
            navigate("/home");
        } catch (error) {
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

                    * {
                        padding: 0px;
                        margin: 0px;
                        box-sizing: border-box;
                    }

                    :root {
                        --linear-grad: linear-gradient(to right, #0f2027, #2c5364);
                        --grad-clr1: #0f2027;
                        --grad-clr2: #2c5364;
                        --accent-color: #4caf50;
                    }

                    body {
                        height: 100vh;
                        background: #f6f5f7;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-family: 'Poppins', sans-serif;
                    }

                    .container {
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
                        position: relative;
                        overflow: hidden;
                        width: 768px;
                        max-width: 100%;
                        min-height: 600px;
                    }

                    .form-container {
                        position: absolute;
                        top: 0;
                        height: 100%;
                        transition: all 0.6s ease-in-out;
                    }

                    .sign-in-container, .sign-up-container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 0 50px;
                    }

                    .sign-in-container {
                        left: 0;
                        width: 50%;
                        z-index: 2;
                    }

                    .sign-up-container {
                        left: 0;
                        width: 50%;
                        opacity: 0;
                        z-index: 1;
                    }

                    .container.right-panel-active .sign-in-container {
                        transform: translateX(100%);
                    }

                    .container.right-panel-active .sign-up-container {
                        transform: translateX(100%);
                        opacity: 1;
                        z-index: 5;
                    }

                    .overlay-container {
                        position: absolute;
                        top: 0;
                        left: 50%;
                        width: 50%;
                        height: 100%;
                        overflow: hidden;
                        transition: transform 0.6s ease-in-out;
                        z-index: 100;
                    }

                    .container.right-panel-active .overlay-container {
                        transform: translateX(-100%);
                    }

                    .overlay {
                        background: var(--linear-grad);
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: 0 0;
                        color: #fff;
                        position: relative;
                        left: -100%;
                        height: 100%;
                        width: 200%;
                        transform: translateX(0);
                        transition: transform 0.6s ease-in-out;
                    }

                    .container.right-panel-active .overlay {
                        transform: translateX(50%);
                    }

                    .overlay-panel {
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        padding: 0 40px;
                        text-align: center;
                        top: 0;
                        height: 100%;
                        width: 50%;
                        transform: translateX(0);
                        transition: transform 0.6s ease-in-out;
                    }

                    .overlay-left {
                        transform: translateX(-20%);
                    }

                    .container.right-panel-active .overlay-left {
                        transform: translateX(0);
                    }

                    .overlay-right {
                        right: 0;
                        transform: translateX(0);
                    }

                    .container.right-panel-active .overlay-right {
                        transform: translateX(20%);
                    }

                    .social-container {
                        margin: 20px 0;
                    }

                    .social-container a {
                        border: 1px solid #ddd;
                        border-radius: 50%;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        margin: 0 5px;
                        height: 40px;
                        width: 40px;
                        transition: transform 0.3s ease;
                    }

                    .social-container a:hover {
                        transform: scale(1.1);
                    }

                    button {
                        border-radius: 20px;
                        border: 1px solid var(--grad-clr1);
                        background-color: #243B55;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                        padding: 12px 45px;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        transition: transform 80ms ease-in;
                    }

                    button:active {
                        transform: scale(0.95);
                    }

                    button:focus {
                        outline: none;
                    }

                    .forgot {
                        color: #333;
                        font-size: 12px;
                        text-decoration: none;
                        margin: 15px 0;
                        transition: color 0.3s ease;
                    }

                    .forgot:hover {
                        color: var(--grad-clr1);
                    }

                    .overlay h1 {
                        font-size: 2.5rem;
                    }

                    form {
                        background-color: #fff;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 0 50px;
                        height: 100%;
                        text-align: center;
                    }

                    input {
                        background-color: #eee;
                        border: none;
                        padding: 12px 15px;
                        margin: 8px 0;
                        width: 150%;
                        transition: background-color 0.3s ease;
                    }

                    input:focus {
                        background-color: #ddd;
                        outline: none;
                    }

                    .logo {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin-bottom: 10px;
                        color: var(--grad-clr2);
                    }
                `}            </style>

            <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleRegister}>
                        <div className="logo">TST ELECTRONICS</div>
                        <h5>Create Account</h5>

                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <div className="logo">TST ELECTRONICS</div>
                        <h5>Sign in</h5>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a href="#" className="forgot">Forgot your password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                {/* Overlay */}
                <div className="overlay-container" id="overlayCon">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start exploring the latest gadgets</p>
                            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;
