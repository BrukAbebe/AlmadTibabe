const cloudinary = require("cloudinary").v2;
const { configs } = require("../config");

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn("⚠️ Cloudinary config missing! Skipping Cloudinary setup.");
} else {
  cloudinary.config({
    cloud_name: configs.cloudinary.name,
    api_key: configs.cloudinary.key,
    api_secret: configs.cloudinary.secret,
  });
}

module.exports = cloudinary;

// if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
//     console.error("Cloudinary config missing! Check your environment variables.");
//     process.exit(1); 
//   }
  
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
  
//   module.exports = cloudinary;