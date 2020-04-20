const CONSTANTS = require('./constants');
const validateCurrencyCode = require('validate-currency-code');

const utils = {
    validateProductID: (productID) => {
            return true;
        },

    validatePriceUpdateData: (data) => {

        return true;

        let current_price = data['current_price'];
        let value = current_price['value'];
        let currency_code = current_price['currency_code'];

        if(
            'undefined' !== typeof(current_price) ||
            'number' !== typeof(value) ||
            !validateCurrencyCode(currency_code)
        ) {
            return false;
        } else {
            return true;
        }

    }
}

module.exports = {
    utils,
};
