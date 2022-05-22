const productModel = require('../models/productModel');

module.exports.allProducts = async function allProducts(req, res) {
    try {
        // queries
        const qnew = req.query.new;
        const qcategory = req.query.category;
        let products;

        if (qnew) {
            products = await productModel.find().sort({ createdAt: -1 }).limit(5);
        } else if (qcategory) {
            products = await productModel.find({
                categories: {
                    $in: [qcategory]
                }
            })
        } else {
            products = await productModel.find();
        }

        res.json({
            message: "all products retrieved!",
            data: products
        })

    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.createProduct = async function createProduct(req, res) {
    // only admins can create
    try {
        const newProduct = new productModel(req.body);
        const savedProduct = await newProduct.save();
        res.json({
            message: 'product created!',
            data: savedProduct
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.updateProduct = async function updateProduct(req, res) {
    try {
        const product = await productModel.findById(req.params.id);
        Object.forEach(req.body).keys(function(key) {
            product[key] = req.body[key];
        });
        const updatedProduct = await product.save();
        res.json({
            message: "product updated!",
            data: updatedProduct
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.deleteProduct = async function deleteProduct(req, res) {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        res.json({
            message: "product deleted!",
            data: deletedProduct
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.getProduct = async function getProduct(req, res) {
    try {
        const product = await productModel.findById(req.params.id);
        res.json({
            message: "product retrieved!",
            data: product
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}