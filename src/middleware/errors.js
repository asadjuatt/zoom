const { json } = require('express');
const ErrorResponse = require('../util/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    if (err.name == 'CastError') {
        const message = `Resource Not Found`;
        error = new ErrorResponse(message, 400)
    }
    let errors = {};
    if (err.name == 'ValidationError') {
        const allErrors = err.message.substring(err.message.indexOf(':') + 1).trim();
        const allErrorInArrayFormat = allErrors.split(',').map(err => err.trim());
        allErrorInArrayFormat.forEach(error => {
            const [key, value] = error.split(":").map(err => err.trim())
            errors[key] = value;
        });
        error = new ErrorResponse(errors, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: errors || 'Server Error',
        message:error
    });
};

function logErrors (err, req, res, next) {
    console.error(err.stack)
    console.log("err>",err)

    next(err)
  }
  function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something failed!' })
    } else {
      next(err)
    }
  }
module.exports = {errorHandler, logErrors, clientErrorHandler};