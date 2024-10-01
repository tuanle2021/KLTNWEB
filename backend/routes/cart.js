const express = require("express");
const router = express.Router();

const { addToCart, getCart } = require("../controllers/cartController");
const { authentication } = require("../middleware/authenUser");

router.post("/cart/add", authentication, addToCart);
router.get("/cart", authentication, getCart);

module.exports = router;
