const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const pool = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Production Ecommerce API",
        version: "1.0.0"
    });
});

// Health Check Route
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        uptime: process.uptime()
    });
});

// API Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Test PostgreSQL Connection
pool.connect()
    .then((client) => {
        console.log("✅ Connected to PostgreSQL");
        client.release();
    })
    .catch((err) => {
        console.error("❌ PostgreSQL connection failed:", err.message);
    });

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
