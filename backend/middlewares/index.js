const authMiddleware = require("./authMiddleware");
const errorConverter = require("./errorConverter");
const errorHandler = require("./errorHandler");
const notFoundHandler = require("./notFoundHandler");
const validate = require("./validate");

module.exports = {
  protect: authMiddleware.protect,
  errorConverter,
  errorHandler,
  notFoundHandler,
  validate,
};
