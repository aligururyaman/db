import { v2 as cloudinary } from "cloudinary";

const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
};
//dev pulse studio
export default uploadImageToCloudinary;
