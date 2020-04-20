const {CONSTANTS} = require('./constants');

const allowedMethods = (req, res, next) => {
    // only accepts GET and PUT
    if(['GET', 'PUT'].includes(req.method)) {
        next()
    } else {
        res.status(
                CONSTANTS.HTTP_RESPONSES.METHOD_NOT_ALLOWED.CODE
            ).send(
                CONSTANTS.HTTP_RESPONSES.METHOD_NOT_ALLOWED.MESSAGE
            );
    }
}

const decodeURI = (req, res, next) => {
    // decode any encoded characters
    try {
        decodeURIComponent(req.path);
    } catch (error) {
        return res.status(
            CONSTANTS.HTTP_RESPONSES.UNSUPPORTED_MEDIA_TYPE.CODE
        ).send(
            CONSTANTS.HTTP_RESPONSES.UNSUPPORTED_MEDIA_TYPE.MESSAGE
        );
    }
    next();
}

const pageNotFound = (req, res) => {
    // catch-all if none of the routes match the request
    res.status(
        CONSTANTS.HTTP_RESPONSES.PAGE_NOT_FOUND.CODE
    ).send(
        CONSTANTS.HTTP_RESPONSES.PAGE_NOT_FOUND.MESSAGE
    );
}

const errorHandler = (error, req, res, next) => {
    // catch-all for errors rather than sending 500s from all over the code
    if(error === CONSTANTS.HTTP_RESPONSES.INVALID_PARAMS.MESSAGE) {
        res.status(
            CONSTANTS.HTTP_RESPONSES.INVALID_PARAMS.CODE
        ).send(
            CONSTANTS.HTTP_RESPONSES.INVALID_PARAMS.MESSAGE
        );
    } else if (error === CONSTANTS.HTTP_RESPONSES.PAGE_NOT_FOUND.MESSAGE) {
        res.status(
            CONSTANTS.HTTP_RESPONSES.PAGE_NOT_FOUND.CODE
        ).send(
            CONSTANTS.HTTP_RESPONSES.PAGE_NOT_FOUND.MESSAGE
        );
    } else {
        console.log(error)
        res.status(
            CONSTANTS.HTTP_RESPONSES.INTERNAL_SERVER_ERROR.CODE
        ).send(
            CONSTANTS.HTTP_RESPONSES.INTERNAL_SERVER_ERROR.MESSAGE
        )
    }
}

module.exports = {
    errorHandler,
    pageNotFound,
    decodeURI,
    allowedMethods,
}