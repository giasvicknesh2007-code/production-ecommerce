const pool = require("../config/database");

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM products ORDER BY id"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO products
            (name, description, price, stock)
            VALUES ($1,$2,$3,$4)
            RETURNING *`,
            [name, description, price, stock]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const result = await pool.query(
            `UPDATE products
             SET name=$1,
                 description=$2,
                 price=$3,
                 stock=$4
             WHERE id=$5
             RETURNING *`,
            [
                name,
                description,
                price,
                stock,
                req.params.id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM products WHERE id=$1 RETURNING *",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.json({
            message: "Product deleted"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};
