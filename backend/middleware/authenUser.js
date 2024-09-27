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
    if (error.name === "TokenExpiredError") {
      // Lấy email người dùng từ token
      const decoded = jwt.decode(token);
      const user = await User.findById(decoded.id);

      if (user) {
        // Gửi lại email xác nhận
        const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const url = `${process.env.BASE_URL}/activate/${newToken}`;
        await sendEmail(user.email, user.name, url);

        return res.status(401).json({
          message: "Token expired. A new activation email has been sent.",
        });
      }
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};
