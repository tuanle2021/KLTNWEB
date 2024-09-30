const Category = require("../models/Category");

// Controller để thêm danh mục mới
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Tạo danh mục mới
    const newCategory = new Category({
      name,
      description,
    });

    // Lưu danh mục vào cơ sở dữ liệu
    const savedCategory = await newCategory.save();

    // Trả về phản hồi thành công
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addCategory,
};
