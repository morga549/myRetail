const request = require('request-promise-native');
const {CONSTANTS} = require('./constants');

const getProductData = async (productTCIN) => {
    let redskyURL = CONSTANTS.REDSKY.URL + productTCIN;

    let excludesList = CONSTANTS.REDSKY.EXCLUDES_LIST
        .reduce((total, curr) => {return total.concat(curr + ',')}, '');

    return await request
        .get({
            url: redskyURL,
            qs: {
                excludes: excludesList
            }
        });
}

module.exports = {
    getProductData,
}