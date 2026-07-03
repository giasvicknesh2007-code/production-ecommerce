exports.getProducts = (req, res) => {
    const products = [
        {
            id: 1,
            name: "Laptop",
            price: 75000
        },
        {
            id: 2,
            name: "Keyboard",
            price: 2500
        },
        {
            id: 3,
            name: "Mouse",
            price: 1200
        }
    ];

    res.json(products);
};
