const { StatusCodes } = require("http-status-codes");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const validationError = new Error(`Validation failed: ${error.details.map((detail) => detail.message).join(', ')}`);
    validationError.statusCode = StatusCodes.BAD_REQUEST;
    return next(validationError); 
  }
  next();
};

module.exports = validate;
