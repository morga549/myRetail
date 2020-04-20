const productsService = require('../services/products.service');
const { utils }  = require('../utils/utils');
const { CONSTANTS } = require('../utils/constants');

const getProduct = async (req, res, next) => {
    try{
        let { productID } = req.params;

        productID = parseInt(productID);

        if(productID) {
            if(utils.validateProductID(productID)) {
                let returnValue = await productsService.getProduct(productID);
                if(returnValue) {
                    res.status(CONSTANTS.HTTP_RESPONSES.GET_SUCCESS.CODE).send(returnValue);
                } else {
                    res.status(CONSTANTS.HTTP_RESPONSES.PAGE_NOT_FOUND.CODE)
                        .send(CONSTANTS.HTTP_RESPONSES.PAGE_NOT_FOUND.MESSAGE);
                }
            } else {
                res.status(CONSTANTS.HTTP_RESPONSES.INVALID_PARAMS.CODE)
                    .send(CONSTANTS.HTTP_RESPONSES.INVALID_PARAMS.MESSAGE)
            }
        } else {
            res.status(CONSTANTS.HTTP_RESPONSES.MISSING_PARAM.CODE)
                .send(CONSTANTS.HTTP_RESPONSES.MISSING_PARAM.MESSAGE);
        }
    } catch(error) {
        next(error)
    }

}

const updateProductPrice = async (req, res, next) => {
    try{
        let { productID } = req.params;
        const data = req.body;

        productID = parseInt(productID);

        if(productID) {
            if(
                utils.validateProductID(productID) &&
                utils.validatePriceUpdateData(data)
            ) {
                let returnValue = await productsService.updateProductPrice(productID, data);
                if(returnValue != null) {
                    res.status(201).send(returnValue);
                } else {
                    res.status(409).send('Conflict')
                }
            } else {
                res.status(400).send('Invalid parameters')
            }
        } else {
            res.status(400).send('Missing parameter');
        }
    } catch(error) {
        next(error)
    }

}

module.exports = {
    getProduct,
    updateProductPrice
}

