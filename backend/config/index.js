const connectDB = require("./db");
const cloudinary = require("./cloudinary");
const configs = require("./configs");

module.exports = {
  connectDB,
  cloudinary,
  configs,
};
