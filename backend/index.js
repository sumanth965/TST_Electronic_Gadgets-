const express = require('express');
const RunServer = require('./Database/connection');
const userRoutes = require('./routes/userRoutes');
const addRoutes = require('./routes/addRoutes');
const contactRoutes = require('./routes/contactRoutes');
const placeorderRoutes = require('./routes/placeorderRoutes');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config(); // Load .env before using it

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
RunServer();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Serve static images
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));

// API Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1', contactRoutes);
app.use('/api/v1', addRoutes);
app.use('/api/orders', placeorderRoutes);

// 404 Fallback
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
