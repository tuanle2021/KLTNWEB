const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Cấu hình multer để lưu trữ file tạm thời trên đĩa
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../tmp");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file) {
      return cb(new Error("No file uploaded"));
    }

    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      file.originalname.split(".").pop().toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      // Xóa tệp tin tạm thời nếu định dạng không hợp lệ
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Error deleting temporary file ${file.path}:`, err);
        }
        cb(new Error("Only images are allowed"));
      });
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước tệp tin là 5MB
});

const imageType = upload.array("images", 10); // Cho phép upload nhiều file

module.exports = { imageType };
