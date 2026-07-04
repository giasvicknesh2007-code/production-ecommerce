CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, stock)
VALUES
('Laptop','Gaming Laptop',75000,10),
('Keyboard','Mechanical Keyboard',2500,25),
('Mouse','Wireless Mouse',1200,50);
