const express = require('express');
const productController = require('../controllers/products.controller');

const router = express.Router();

router.get('/:productID', productController.getProduct);
router.put('/:productID', productController.updateProductPrice);

module.exports = router;