const CONSTANTS = {
    HTTP_RESPONSES: {
        INVALID_PARAMS: {
            CODE: 400,
            MESSAGE: 'Invalid Parmeters'
        },
        MISSING_PARAM: {
            CODE: 400,
            MESSAGE: 'Missing Parameter'
        },
        INTERNAL_SERVER_ERROR: {
            CODE: 500,
            MESSAGE: 'Internal Server Error'
        },
        PAGE_NOT_FOUND: {
            CODE: 404,
            MESSAGE: 'Page Not Found'
        },
        METHOD_NOT_ALLOWED: {
            CODE: 405,
            MESSAGE: 'Method Not Allowed'
        },
        UNSUPPORTED_MEDIA_TYPE: {
            CODE: 415,
            MESSAGE: 'Unsupported Media Type'
        },
        GET_SUCCESS: {
            CODE: 200
        },
        PUT_SUCCESS: {
            CODE: 201
        },
        NO_CONTENT:{
            CODE: 204,
            PRICE_MESSAGE: 'Price data not available',
            NAME_MESSAGE: 'Product data not available'
        }
    },
    REDSKY: {
        URL: 'http://redsky.target.com/v2/pdp/tcin/',
        EXCLUDES_LIST: [
            'taxonomy',
            'price',
            'promotion',
            'bulk_ship',
            'rating_and_review_reviews',
            'rating_and_review_statistics',
            'question_answer_statistics',
            'available_to_promise_network',
        ]
    }
}

module.exports = {
    CONSTANTS,
}
