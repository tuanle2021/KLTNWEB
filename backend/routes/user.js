const express = require("express");
const {
  register,
  activateAccount,
  login,
  sendVerification,
  sendCodeResetPassword,
  verifyCodeResetPassword,
  resetPassword,
  getAllUsers,
  getUserById,
} = require("../controllers/userControllers");
const router = express.Router();
const { authentication } = require("../middleware/authenUser");

router.post("/register", register);
router.post("/activate", authentication, activateAccount);
router.post("/login", login);
router.post("/authen", authentication);
router.get("/users", authentication, getAllUsers);
router.get("/users/:id", authentication, getUserById);
router.post("/sendVerification", authentication, sendVerification);
router.post("/sendCodeResetPassword", sendCodeResetPassword);
router.post("/verifyCodeResetPassword", verifyCodeResetPassword);
router.post("/resetPassword", resetPassword);
module.exports = router;
