const { StatusCodes } = require("http-status-codes");

const notFoundHandler = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({ 
    success: false, 
    message: 'Resource not found'
  });
};

module.exports = notFoundHandler;