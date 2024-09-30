const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;
const fs = require("fs");
const path = require("path");

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

// Hàm gửi ảnh lên Cloudinary
const uploadImageToCloudinary = (filePath, folderPath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { resource_type: "image", folder: folderPath },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
  });
};

// Controller để upload nhiều ảnh lên Cloudinary
const uploadImages = async (req, res) => {
  try {
    const files = req.files;
    const folderPath = req.body.folderPath || ""; // Lấy folderPath từ body, nếu không có thì để trống

    if (!files) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadResults = [];
    const uploadPromises = files.map((file) => {
      return uploadImageToCloudinary(file.path, folderPath)
        .then((url) => {
          uploadResults.push(url);
          return url;
        })
        .catch((error) => {
          console.error(`Error uploading file ${file.originalname}:`, error);
          throw error;
        });
    });

    await Promise.all(uploadPromises);

    // Xóa các tệp tin tạm thời
    files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Error deleting temporary file ${file.path}:`, err);
        }
      });
    });

    res.status(201).json(uploadResults);
  } catch (error) {
    console.error(error);

    // Xóa các tệp tin tạm thời trong trường hợp lỗi
    req.files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Error deleting temporary file ${file.path}:`, err);
        }
      });
    });

    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadImages };
