const express = require('express');
const productRouter = express.Router();
const { createProduct, updateProduct, deleteProduct, getProduct, allProducts } = require('../controllers/productController');
const { verifyTokenAdmin } = require('../middlewares/verifyToken');

productRouter.route('/')
.get(allProducts);

productRouter.route('/:id')
.get(getProduct);

productRouter.use(verifyTokenAdmin);
productRouter.route('/create')
.post(function(req, res) {
    createProduct(req, res);
});

productRouter.route('/:id')
.patch(updateProduct)
.delete(deleteProduct)

module.exports = productRouter;