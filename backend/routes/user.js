const express = require("express");
const {
  register,
  activateAccount,
  login,
  requestNewToken,
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userControllers");
const router = express.Router();
const { authentication } = require("../middleware/authenUser");
const { addProduct } = require("../controllers/productControllers");
const { addCategory } = require("../controllers/categoriesControllers");

router.post("/register", register);
router.post("/activate", authentication, activateAccount);
router.post("/login", login);
router.post("/products", addProduct);
router.post("/categories", addCategory);
router.post("/authen", authentication);
router.get("/users", authentication, getAllUsers);
router.get("/users/:id", authentication, getUserById);
router.post("/users", authentication, createUser);

module.exports = router;
