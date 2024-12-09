const express = require("express");
const {
  register,
  activateAccount,
  login,
  sendVerification,
  sendCodeResetPassword,
  verifyCodeResetPassword,
  resetPassword,
  requestNewToken,
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userControllers");
const router = express.Router();
const { authentication } = require("../middleware/authenUser");

router.get("/users", authentication, getAllUsers);
router.get("/users/:id", authentication, getUserById);
router.post("/register", register);
router.post("/activate", authentication, activateAccount);
router.post("/login", login);
router.post("/authen", authentication);
router.post("/sendVerification", authentication, sendVerification);
router.post("/sendCodeResetPassword", sendCodeResetPassword);
router.post("/verifyCodeResetPassword", verifyCodeResetPassword);
router.post("/resetPassword", resetPassword);
router.post("/users", authentication, createUser);

module.exports = router;
