const productsDB = require('../db/products.db');
const {CONSTANTS} = require('../utils/constants');
const redsky = require('../utils/redsky');

const environment = process.env.NODE_ENV || 'dev';

const getProduct = async (productID) => {
    try {
        let requests = [];
        requests.push(redsky.getProductData(productID));
        requests.push(productsDB.getProduct(productID));

        let data = await Promise.allSettled(requests);
        let redskyResult = data[0];
        let mongoResult = data[1];
        let productTitle, priceData;

        if(
            (redskyResult.status == 'rejected' && redskyResult.reason.statusCode === 404) ||
            (mongoResult.status == 'fulfilled' && mongoResult.value === null)
        ){
            return null;
        }
        let redskyJSON = JSON.parse(redskyResult.value);
        productTitle = redskyJSON.product.item.product_description.title;
        priceData = data[1].value;
        priceData['id'] = priceData['_id'];
        delete priceData['_id'];

        let returnValue = Object.assign({}, priceData, {name: productTitle});
        return returnValue;
    } catch(error) {
        throw new Error(error);
    }

}

const updateProductPrice = async (productID, data) => {

    let priceUpdateObj = await productsDB.updateProduct(productID, data);

    return priceUpdateObj;
}

module.exports = {
    getProduct,
    updateProductPrice,
}