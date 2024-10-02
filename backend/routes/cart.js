const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  deleteCartItem,
} = require("../controllers/cartController");
const { authentication } = require("../middleware/authenUser");

router.post("/cart/add", authentication, addToCart);
router.get("/cart", authentication, getCart);
router.delete("/cart/:id", authentication, deleteCartItem);

module.exports = router;
