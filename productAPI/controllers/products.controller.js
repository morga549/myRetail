const productsService = require('../services/products.service');
const { utils }  = require('../utils/utils');

const getProduct = async (req, res, next) => {
    const { productID } = req.params;

    if(productID) {
        if(utils.validateProductID(productID)) {
            let returnValue = await productsService.getProduct(productID);
            res.status(200).send(returnValue);
        } else {
            res.status(400).send('Invalid parameters')
        }
    } else {
        res.status(400).send('Missing parameter');
    }
}

module.exports = {
    getProduct,
}

