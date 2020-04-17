const productsDB = require('../db/products.db');
const {CONSTANTS} = require('../utils/constants');
const redsky = require('../utils/redsky');

const environment = process.env.NODE_ENV || 'dev';

const getProduct = async (productID) => {
    //TODO - Make a call to RedSky API here
    let redskyResult = await redsky.getProductData(productID);
    let redskyJSON = JSON.parse(redskyResult);
    let productTitle = redskyJSON.product.item.product_description.title;
    let priceData = await productsDB.getProduct(productID);
    priceData['id'] = priceData['_id'];
    delete priceData['_id'];

    let returnValue = Object.assign({}, priceData, {name: productTitle});
    return returnValue;
}

module.exports = {
    getProduct,
}