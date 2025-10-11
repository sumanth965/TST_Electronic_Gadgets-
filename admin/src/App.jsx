import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminHome from "./pages/AdminHome/AdminHome";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddItem from './pages/Additems/Additems';
import ListItems from './pages/ListItems/ListItems';
import UserDetails from "./pages/Userdetails/Userdetails";
import AdminPassword from "./pages/Adminpassword/AdminPassword";
import { Outlet } from 'react-router-dom';


export default function App() {
  const [credentials, setCredentials] = useState(() => {
    const storedCredentials = localStorage.getItem('adminCredentials');
    return storedCredentials ? JSON.parse(storedCredentials) : [
      { username: 'Sumanth', password: '123' },
      { username: 'Thushar', password: '123' },
      { username: 'Shetty', password: '123' },
    ];
  });

  // Update local storage whenever credentials change
  useEffect(() => {
    localStorage.setItem('adminCredentials', JSON.stringify(credentials));
  }, [credentials]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLogin credentials={credentials} />} />
        <Route path="/admin" element={<AdminHome />}>
          <Route path="add" element={<AddItem />} />
          <Route path="list" element={<ListItems />} />
          <Route path="details" element={<UserDetails />} />
          <Route path="adminpassword" element={<AdminPassword credentials={credentials} setCredentials={setCredentials} />} />
        </Route>
      </Routes>
    </div>
  );
}
