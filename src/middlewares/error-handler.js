const UnauthorizedError = require("../errors/unauthorized-error");

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.MODE_ENV == 'development') {
        resErrorForDev(res, err);
    } else {
        if(err.name == 'JsonWebTokenError') err =  new UnauthorizedError('Invalid token, please login again..');
        if(err.name == 'TokenExpiredError') err =  new UnauthorizedError('Expired token, please login again..')
        resErrorForProd(res, err);
    }
        
};

const resErrorForDev = (res, err) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const resErrorForProd = (res, err) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

module.exports = errorHandler;