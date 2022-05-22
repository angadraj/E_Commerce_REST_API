const cartModel = require('../models/cartModel');

module.exports.addToCart = async function addToCart(req, res) {
    try {
        const newCart = new cartModel(req.body);
        const savedCart = await newCart.save();
        res.json({
            message: "Cart saved!",
            data: savedCart
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

// schema needs to be changed;

