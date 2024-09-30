const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// Cấu hình multer để lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu trữ file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tên file
  },
});

const upload = multer({ storage: storage }).array("images", 10); // Cho phép upload nhiều file

// Controller để thêm sản phẩm mới
const addProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload error" });
    }

    try {
      const { name, description, price, stock, category_id } = req.body;

      // Kiểm tra các trường bắt buộc
      if (!name || !description || !price || !stock || !category_id) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Chuyển đổi các giá trị cần thiết từ text sang number
      const priceNumber = parseFloat(price);
      const stockNumber = parseInt(stock, 10);

      // Kiểm tra xem các giá trị đã được chuyển đổi thành công hay chưa
      if (isNaN(priceNumber) || isNaN(stockNumber)) {
        return res
          .status(400)
          .json({ message: "Price and stock must be valid numbers" });
      }

      // Lấy danh sách URL của các file đã upload
      const images = req.files.map((file) => file.path);

      // Tạo sản phẩm mới
      const newProduct = new Product({
        name,
        description,
        price: priceNumber,
        stock: stockNumber,
        category_id,
        images,
      });

      // Lưu sản phẩm vào cơ sở dữ liệu
      const savedProduct = await newProduct.save();

      // Trả về phản hồi thành công
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
};

module.exports = {
  addProduct,
};
