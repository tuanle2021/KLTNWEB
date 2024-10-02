const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
  updateOrderItems,
} = require("../controllers/orderController");
const { authentication } = require("../middleware/authenUser");

router.post("/orders", authentication, createOrder);
router.get("/orders/:id", authentication, getOrderById);
router.get("/orders/user/:user_id", authentication, getOrdersByUserId);
router.put("/orders/:id", authentication, updateOrderStatus);
router.put("/orders/:id/items", authentication, updateOrderItems);

module.exports = router;
