import React, { useState } from 'react';

const AdminPassword = ({ credentials, setCredentials }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showAdmins, setShowAdmins] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [authUsername, setAuthUsername] = useState('');
    const [authPassword, setAuthPassword] = useState('');

    const handleAddCredential = () => {
        if (newUsername && newPassword) {
            setCredentials([...credentials, { username: newUsername, password: newPassword }]);
            setNewUsername('');
            setNewPassword('');
        }
    };

    const handleDeleteCredential = (index) => {
        const updatedCredentials = credentials.filter((_, i) => i !== index);
        setCredentials(updatedCredentials);
    };

    const handleAuthentication = () => {
        const isValid = credentials.some(
            (cred) => cred.username === authUsername && cred.password === authPassword
        );
        if (isValid) {
            setIsAuthenticated(true);
            setShowPopup(false);
        } else {
            alert('Invalid username or password');
        }
    };

    const handleAccessRequest = (action) => {
        if (isAuthenticated) {
            action === 'add' ? handleAddCredential() : setShowAdmins(!showAdmins);
        } else {
            setShowPopup(true);
        }
    };

    return (
        <>
            <style>{`
                .admin-container {
                    display: flex;
                    justify-content: center;
                    padding: 20px;
                    background: #fff;
                    margin-top:25px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .admin-card {
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                    color: #333;
                }

                .admin-card h2 {
                    margin-bottom: 20px;
                    color: #007bff;
                }

                .admin-input-group {
                    margin-bottom: 15px;
                }

                .admin-input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                }

                .admin-add-btn, .toggle-btn {
                    width: 100%;
                    padding: 10px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-bottom: 10px;
                }

                .admin-list {
                    list-style: none;
                    padding: 0;
                }

                .admin-list-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 12px;
                    background: #f9f9f9;
                    margin-top: 8px;
                    border-radius: 4px;
                }

                .admin-delete-btn {
                    color: #dc3545;
                    border: none;
                    background: none;
                    cursor: pointer;
                }

                .auth-popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.5);
                }

                .auth-card {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    max-width: 300px;
                }

                .auth-input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                }

                .auth-btn {
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
            `}</style>

            <div className="admin-container">
                <div className="admin-card">
                    <h2>Admin Password Management</h2>
                    <p>Control admin access by adding or removing credentials.</p>
                    <div className="admin-input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            className="admin-input"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            disabled={!isAuthenticated}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="admin-input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={!isAuthenticated}
                        />
                    </div>
                    <button className="admin-add-btn" onClick={() => handleAccessRequest('add')}>
                        Add Admin
                    </button>

                    <button className="toggle-btn" onClick={() => handleAccessRequest('show')}>
                        {showAdmins ? 'Hide Existing Admins' : 'Show Existing Admins'}
                    </button>

                    {showAdmins && (
                        <>
                            <h4 className="admin-list-title">Existing Admins</h4>
                            <ul className="admin-list">
                                {credentials.map((cred, index) => (
                                    <li key={index} className="admin-list-item">
                                        <span>{cred.username}</span>
                                        <button
                                            className="admin-delete-btn"
                                            onClick={() => handleDeleteCredential(index)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>

            {showPopup && (
                <div className="auth-popup">
                    <div className="auth-card">
                        <h3>Admin Authentication</h3>
                        <input
                            type="text"
                            placeholder="Username"
                            className="auth-input"
                            value={authUsername}
                            onChange={(e) => setAuthUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="auth-input"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                        />
                        <button className="auth-btn" onClick={handleAuthentication}>
                            Authenticate
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPassword;
