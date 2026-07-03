exports.createOrder = (req, res) => {
    const order = {
        id: Date.now(),
        customer: req.body.customer,
        product: req.body.product,
        quantity: req.body.quantity
    };

    res.status(201).json({
        message: "Order created successfully",
        order
    });
};
