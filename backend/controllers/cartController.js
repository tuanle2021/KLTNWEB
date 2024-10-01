const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Lấy _id của người dùng từ middleware

    // Kiểm tra xem sản phẩm có tồn tại không
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Kiểm tra xem giỏ hàng của người dùng đã tồn tại chưa
    let cart = await Cart.findOne({ user_id: userId }).populate("items");
    if (!cart) {
      // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
      cart = new Cart({ user_id: userId, items: [], total_price: 0 });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let cartItem = await CartItem.findOne({
      cart_id: cart._id,
      product_id: productId,
    });
    if (cartItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới
      cartItem = new CartItem({
        cart_id: cart._id,
        product_id: productId,
        quantity,
      });
      await cartItem.save();
      cart.items.push(cartItem._id);
    }

    // Cập nhật tổng giá
    cart.total_price += product.price * quantity;

    // Lưu giỏ hàng
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addToCart,
};
