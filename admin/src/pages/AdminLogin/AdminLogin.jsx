import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import seaBackground from '../../assets/imgg2.jpg';

const AdminLogin = ({ credentials }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isValid = credentials.some(
            (cred) => cred.username === username && cred.password === password
        );

        if (isValid) {
            localStorage.setItem('token', 'dummy-token');
            navigate('/admin');
        } else {
            setError("Invalid username or password.");
        }

        setUsername('');
        setPassword('');
        setLoading(false);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: "Poppins", sans-serif;
                }

                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: url(${seaBackground}) no-repeat;
                    background-size: cover;
                    background-position: center;
                }

                .card {
                    width: 100%;
                    max-width: 420px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(9px);
                    color: #fff;
                    border-radius: 12px;
                    padding: 30px 40px;
                }

                .card h1 {
                    font-size: 36px;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .form-control {
                    background: transparent;
                    color: #fff;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 40px;
                }

                .form-control::placeholder {
                    color: #aaa;
                }

                .btn-primary {
                    width: 100%;
                    padding: 15px;
                    border-radius: 40px;
                    background-color: #fff;
                    color: #333;
                    font-weight: bold;
                    font-size: 16px;
                    cursor: pointer;
                }

                .text-danger {
                    text-align: center;
                    font-size: 14px;
                    margin-top: 10px;
                }

                .spinner-border {
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-top: 4px solid #fff;
                    border-radius: 50%;
                }
            `}</style>

            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4">
                    <h1>Admin Login</h1>
                    <form onSubmit={handleLogin} noValidate autoComplete="off">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Admin Name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 position-relative">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-light position-absolute top-50 end-0 translate-middle-y me-3"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {error && <div className="text-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                            {loading ? <div className="spinner-border spinner-border-sm"></div> : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
