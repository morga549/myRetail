const express = require('express');
const productController = require('../controllers/products.controller');

const router = express.Router();

router.get('/:productID', productController.getProduct);

module.exports = router;