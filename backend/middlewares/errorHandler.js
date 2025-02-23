const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const status = statusCode >= 500 ? "error" : "fail";

  res.status(statusCode).json({
    status,
    message: err.message || "Something went wrong.",
    ...(process.env.NODE_ENV === 'development' && { error: err.stack })
  });
};

module.exports = errorHandler;
