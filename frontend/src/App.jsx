import React from "react";
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import { Route, Routes } from "react-router-dom";
import Contactpage from "./Pages/Contactpage/Contactpage";
import Registerpage from "./Pages/Registerpage/Registerpage";
import ReviewPage from "./Pages/Reviewpage/Reviewpage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Devices from "./Pages/Device/Device";
import ProductInfo from "./Pages/ProductInfo/ProductInfo";
import Auth from "./Pages/Auth/Auth";
// import Sign from "./Pages/Sign/Sing";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import EmailValidationComponent from "./Pages/Email";
// import Sidebar from './Components/Sidebar';

export default function App() {
    return (
        <div>

            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path="/devices" element={<Devices />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* <Route path="/register" element={<Registerpage />} /> */}
                    {/* <Route path="/" element={<Auth />} /> */}
                    <Route path="/contact" element={<Contactpage />} />
                    <Route path="/review" element={<ReviewPage />} />
                    <Route path="/i" element={<ProductInfo />} />
                    <Route path="/checkout" element={<PlaceOrder />} />
                    <Route path="/e" element={<EmailValidationComponent />} />
                </Routes>
            </div>
        </div>
    );
}
