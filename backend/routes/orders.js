const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getOrdersByUserId,
} = require("../controllers/orderController");
const { authentication } = require("../middleware/authenUser");

router.post("/orders", authentication, createOrder);
router.get("/orders/:id", authentication, getOrderById);
router.get("/orders/user/:user_id", authentication, getOrdersByUserId);

module.exports = router;
