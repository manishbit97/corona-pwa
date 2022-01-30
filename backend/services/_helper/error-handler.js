module.exports = errorHandler;
const { success, error, validation } = require("../../services/utilities/responseApi");

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json(error(err, res.statusCode));
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json(error(err, res.statusCode));
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json(error(err, res.statusCode));
    }

    // default to 500 server error
    console.log(err)
    return res.status(500).json(error(err, res.statusCode));
    
}