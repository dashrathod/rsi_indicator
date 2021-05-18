const responseHelper = {
    //for all standard errors
    error: function (res, message, httpCode = 200) {
        res.logErrMessage = message;
        res.status(httpCode).json({
            statusCode: 422,
            message: message
        });
    },

    errorWithData: function (res, message, data = {}, httpCode = 200) {
        res.logErrMessage = message;
        res.status(httpCode).json({
            statusCode: 422,
            message: message,
            data: data
        });
    },

    //for standard server error 
    serverError: async function (res, error, httpCode = 200) {
        console.error("\n\n\nSERVER_ERROR : ", error);
        console.error("\n\n\n");
        res.status(httpCode).json({
            statusCode: 500,
            message: 'Server Error'
        });
    },

    //for succesful request with data
    successWithData: function (res, msg, data, httpCode = 200) {
        res.status(httpCode).json({
            statusCode: 200,
            message: msg,
            data: data
        });
    },

    //for successful request with message
    successWithMessage: function (res, message, httpCode = 200) {
        res.status(httpCode).json({
            statusCode: 200,
            message: message
        });
    },

    errorWithMessage: function (message, code) {
        return ({
            "status": code || 0,
            "message": message || 'Error occured',
            "result": {}
        })
    },

}

global.responseHelper = responseHelper;
module.exports = responseHelper;