const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateLength, validateEmail } = require("../helpers/validation");
const { sendEmail } = require("../helpers/sendEmail");
const { generateToken } = require("../helpers/createToken");
exports.register = async (req, res) => {
  try {
    const { name, email, password, address, phone, gender } = req.body;

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
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();
    const emailVerificationToken = generateToken(
      { id: newUser._id.toString() },
      "30m"
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
  const { token } = req.body;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const check = await User.findById(user.id);
  if (check.verified == true) {
    return res.status(400).json({ message: "this email is already activated" });
  } else {
    await User.findByIdAndUpdate(user.id, { verified: true });
    return res
      .status(200)
      .json({ message: "Account has beeen activated successfully." });
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
      return res.status(400).json({ error: "Account is not activated" });
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
      message: "Login Success!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
