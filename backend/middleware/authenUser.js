const jwt = require("jsonwebtoken");

exports.authentication = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Thêm thông tin người dùng vào req
    req.user = decoded;

    // Tiếp tục xử lý yêu cầu
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
