// This is the ENTRY POINT of our backend.
// It starts the server, connects to MongoDB, and hooks up our routes.
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const medicineRoutes = require("./routes/medicines");

const app = express();

// ---- Middleware ----
// ---- Middleware ----
app.use(cors()); // allows our Vue frontend (different port) to talk to this backend
app.use(express.json()); // allows Express to understand JSON data sent in requests

// ---- Routes ----
// Any request to /api/medicines will be handled inside routes/medicines.js
app.use("/api/medicines", medicineRoutes);

// A simple test route to check if server is alive
app.get("/", (req, res) => {
    res.send("Medicine Reminder API is running...");
});

// ---- Connect to MongoDB ----
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
    });