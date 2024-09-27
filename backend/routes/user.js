const express = require("express");
const {
  register,
  activateAccount,
  login,
  requestNewToken,
} = require("../controllers/userControllers");
const router = express.Router();
const { authentication } = require("../middleware/authenUser");
router.post("/register", register);
router.post("/activate", authentication, activateAccount);
router.post("/login/", login);

module.exports = router;
