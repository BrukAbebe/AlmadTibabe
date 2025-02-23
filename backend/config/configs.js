require("dotenv").config(); 

const env = process.env.NODE_ENV || "development";


const configs = {
  env,
  port: process.env.PORT || 5000,
  db: {
    url: process.env.MONGO_URI || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "default_secret",  
    expires_in: process.env.JWT_EXPIRES_IN || "1h", 
  },
  cloudinary: {
    name: process.env.CLOUDINARY_CLOUD_NAME || "",
    key: process.env.CLOUDINARY_API_KEY || "",
    secret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

module.exports = configs;
