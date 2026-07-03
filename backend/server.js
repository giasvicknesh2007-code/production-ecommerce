const orderRoutes = require("./routes/orders");
const productRoutes = require("./routes/products");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Production Ecommerce API",
        version: "1.0.0"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        uptime: process.uptime()
    });
});
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
