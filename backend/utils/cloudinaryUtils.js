const cloudinary = require("../config/cloudinary");

const uploadImage = async (image) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "AlmadTibabe",
    });

    if (!uploadedResponse || !uploadedResponse.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    return uploadedResponse;
  } catch (error) {
    throw new Error("Image upload failed: " + error.message);
  }
};

module.exports = {
  uploadImage,
};
