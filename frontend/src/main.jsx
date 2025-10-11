import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure the path is correct
import { CartProvider } from './Context/CartContext'; // Adjust the import based on your structure
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Include your CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
