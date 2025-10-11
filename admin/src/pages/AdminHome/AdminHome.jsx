import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import admin from '../../assets/admin.jpg'; // Import Admin Logo image
import seaBackground from '../../assets/imgg1.jpg';

const AdminHome = () => {
    return (
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: "Poppins", sans-serif;
                }

                .admin-home {
                    min-height: 100vh;
                    background: #f0f2f5;
                }

                .sidebar {
                    background: url(${seaBackground}) no-repeat;
                    background-size: cover;
                    background-position: center;
                    backdrop-filter: blur(8px);
                    border-right: 1px solid rgba(255, 255, 255, 0.2);
                    color: #fff;
                    padding: 30px 20px;
                    border-radius: 12px;
                    margin-top:24px;
                }

                .sidebar .admin-logo {
                    display: block;
                    margin: 0 auto;
                    border-radius: 50%;
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }

                .sidebar h2 {
                    font-size: 24px;
                    color: white;
                    text-align: center;
                    margin-top: 20px;
                    margin-bottom: 20px;
                }

                .sidebar a {
                    display: block;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 15px;
                    padding: 12px;
                    border-radius: 20px;
                    transition: background 0.3s;
                    color: #fff;
                }

                .sidebar a.btn-primary {
                    background-color: black;
                       border-radius: 20px;

                }

                .sidebar a.btn-primary:hover {
                    background-color: black;
                }

                .sidebar a.btn-danger {
                    background-color: black;
                }

                .sidebar a.btn-danger:hover {
                    background-color: black;
                }


            `}</style>

            <div className="container-fluid admin-home">
                <div className="row">
                    <div className="col-md-3 sidebar shadow">
                        <Link to="/admin/adminpassword">
                            <img
                                src={admin}
                                alt="Admin Logo"
                                className="admin-logo"
                            />
                        </Link>
                        <h2>Admin Dashboard</h2>
                        <Link to="/admin/add" className="btn btn-primary w-100 mb-3 rounded-pill shadow-sm">Add Items</Link>
                        <Link to="/admin/list" className="btn btn-danger w-100 mb-3 rounded-pill shadow-sm">List Items</Link>
                        <Link to="/admin/details" className="btn btn-primary w-100 mb-3 rounded-pill shadow-sm">User Details</Link>
                    </div>

                    <div className="col-md-9 main-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;
