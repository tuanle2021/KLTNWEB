const Product = require("../models/Product");
const { uploadToCloudinary } = require("../controllers/uploadImage");
const { imageType } = require("../middleware/imageType");

// Controller để thêm sản phẩm mới
const addProduct = async (req, res) => {
  try {
    // Sử dụng middleware imageType để kiểm tra và upload hình ảnh
    imageType(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { name, description, price, stock, category_id } = req.body;

      // Kiểm tra các trường bắt buộc
      if (!name || !description || !price || !stock || !category_id) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Upload hình ảnh lên Cloudinary
      const files = req.files;
      const folderPath = "products"; // Đặt tên thư mục trên Cloudinary

      const uploadResults = [];
      for (const file of files) {
        const url = await uploadToCloudinary(
          file.buffer,
          file.originalname,
          folderPath
        );
        uploadResults.push(url);
      }

      // Tạo sản phẩm mới
      const newProduct = new Product({
        name,
        description,
        price,
        stock,
        category_id,
        images: uploadResults, // Lưu URL hình ảnh từ Cloudinary
      });

      // Lưu sản phẩm vào cơ sở dữ liệu
      const savedProduct = await newProduct.save();

      // Trả về phản hồi thành công
      res.status(201).json(savedProduct);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Controller để lấy danh sách tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, stock, category_id, images } = req.body;

    // Kiểm tra quyền hạn của người dùng (chỉ dành cho quản trị viên)
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Tìm sản phẩm theo ID và cập nhật thông tin
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, stock, category_id, images },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
};
