const mongoose = require('mongoose');
require('dotenv').config();

async function RunServer() {
    try {
        const uri =
            process.env.NODE_ENV === 'production'
                ? process.env.CLOUD_MONGO_URI
                : process.env.LOCAL_MONGO_URI;

        console.log("📦 Using Mongo URI:", uri.includes("mongodb+srv") ? "Cloud (Atlas)" : "Localhost");

        await mongoose.connect(uri);

        console.log("✅ MongoDB connected:", uri.includes("mongodb+srv") ? "Cloud" : "Localhost");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = RunServer;
