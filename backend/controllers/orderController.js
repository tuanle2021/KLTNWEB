const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
  try {
    const { shipping_address, items } = req.body;
    const user_id = req.user._id;

    // Tính tổng giá của đơn hàng
    let total_price = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product_id}` });
      }
      const itemTotalPrice = product.price * item.quantity;
      total_price += itemTotalPrice;

      // Lưu thông tin sản phẩm vào orderItems
      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Tạo đơn hàng mới
    const newOrder = new Order({
      user_id,
      total_price,
      shipping_address,
      items: orderItems,
    });

    // Lưu đơn hàng
    const savedOrder = await newOrder.save();

    // Tạo các OrderItem tương ứng
    // Tạo các OrderItem tương ứng
    for (const orderItem of orderItems) {
      const newOrderItem = new OrderItem({
        order_id: savedOrder._id,
        product_id: orderItem.product_id,
        quantity: orderItem.quantity,
        price: orderItem.price,
      });
      await newOrderItem.save();
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("items.product_id");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const orders = await Order.find({ user_id }).populate("items.product_id");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUserId,
};
