const express = require("express");
const router = express.Router();

const { addToCart } = require("../controllers/cartController");
const { authentication } = require("../middleware/authenUser");
router.post("/cart/add", authentication, addToCart);
module.exports = router;
