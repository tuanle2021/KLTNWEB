const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateLength, validateEmail } = require("../helpers/validation");
const { sendEmail } = require("../helpers/sendEmail");
const { generateToken } = require("../helpers/createToken");
exports.register = async (req, res) => {
  try {
    const { name, email, password, address, phone, gender, isAdmin=false } = req.body;

    // Validate dữ liệu
    if (!validateLength(name, 3, 50)) {
      return res
        .status(400)
        .json({ error: "Name must be between 3 and 50 characters" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!validateLength(password, 6, 100)) {
      return res
        .status(400)
        .json({ error: "Password must be between 6 and 100 characters" });
    }
    if (!validateLength(phone, 10, 15)) {
      return res
        .status(400)
        .json({ error: "Phone number must be between 10 and 15 characters" });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      gender,
      isAdmin: req.user && req.user.isAdmin ? isAdmin : false,// Nếu người dùng hiện tại là quản trị viên thì tạo người dùng mới với quyền quản trị viên
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();
    const emailVerificationToken = generateToken(
      { id: newUser._id.toString() },
      "1h"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    // Gửi email xác nhận
    try {
      await sendEmail(newUser.email, newUser.name, url);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res
        .status(500)
        .json({ error: "Error sending verification email" });
    }

    const token = generateToken({ id: newUser._id.toString() }, "7d");

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      address: newUser.address,
      phone: newUser.phone,
      gender: newUser.gender,
      token: token,
      verified: newUser.verified,
      message: "Register Success! Please activate your email to start",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "This email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has beeen activated successfully." });
    }
  } catch (error) {
    console.error("Error in activateAccount:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Kiểm tra tài khoản đã được kích hoạt chưa
    if (!user.verified) {
      return res.status(400).json({
        error:
          "Account is not activated. Please activate your account on the email sent to you.",
      });
    }

    // Tạo token
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      token: token,
      verified: user.verified,
      isAdmin: user.isAdmin,
      message: "Login Success!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    // Kiểm tra quyền hạn của người dùng (chỉ dành cho quản trị viên)
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Lấy tất cả người dùng từ cơ sở dữ liệu
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Kiểm tra quyền hạn của người dùng (chỉ dành cho quản trị viên hoặc chính người dùng đó)
    if (
      !req.user ||
      (!req.user.isAdmin && req.user._id.toString() !== userId)
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Tìm người dùng theo ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, address, isAdmin, password, gender } = req.body;
    console.log("Received input:", { name, email, phone, address, isAdmin, password, gender });

    // Validate data
    if (!validateLength(name, 3, 50)) {
      console.error("Validation error: Name must be between 3 and 50 characters");
      return res
          .status(400)
          .json({ error: "Name must be between 3 and 50 characters" });
    }
    if (!validateEmail(email)) {
      console.error("Validation error: Invalid email format");
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!validateLength(phone, 10, 15)) {
      console.error("Validation error: Phone number must be between 10 and 15 characters");
      return res
          .status(400)
          .json({ error: "Phone number must be between 10 and 15 characters" });
    }
    if (!validateLength(password, 6, 100)) {
      console.error("Validation error: Password must be between 6 and 100 characters");
      return res
          .status(400)
          .json({ error: "Password must be between 6 and 100 characters" });
    }
    if (!gender) {
      console.error("Validation error: Gender is required");
      return res
          .status(400)
          .json({ error: "Gender is required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("Validation error: Email already exists");
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      gender,
      isAdmin: req.user && req.user.isAdmin ? isAdmin : false,
    });

    // Save the new user to the database
    await newUser.save();
    console.log("New user created:", newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
