import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/slices/cartSlice";
import {
  CartContainer,
  CartHeader,
  CartItemContainer,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductQuantity,
  ProductSubtotal,
  RemoveButton,
  CartActions,
  CouponInput,
  ApplyCouponButton,
  CartTotalContainer,
  ProceedToCheckoutButton,
  UpdateCartButton,
  ReturnToShopButton,
  CouponAndTotalContainer,
  CartTotalDetail,
} from "./styles";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, total_price, loading, error } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Hàm để cập nhật số lượng sản phẩm
  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = quantity;
  };

  // Tính tổng giá trị của giỏ hàng
  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <CartContainer>
      {/* Phần tiêu đề giỏ hàng */}
      <CartHeader>
        <span>Image</span>
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Subtotal</span>
      </CartHeader>

      {/* Các sản phẩm trong giỏ hàng */}
      {items.map((item, index) => (
        <CartItemContainer key={item.product._id}>
          <RemoveButton onClick={() => console.log("Remove item")}>
            <IoIosCloseCircle size={20} color="#e74c3c" />
          </RemoveButton>
          <ProductImage src={item.product.images[0]} alt={item.product.name} />
          <ProductName>{item.product.name}</ProductName>
          <ProductPrice>${item.product.price}</ProductPrice>
          <ProductQuantity
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(index, parseInt(e.target.value, 10))
            }
          />
          <ProductSubtotal>
            ${item.product.price * item.quantity}
          </ProductSubtotal>
        </CartItemContainer>
      ))}

      {/* Các hành động như mã coupon và quay lại shop */}
      <CartActions>
        <ReturnToShopButton>Return To Shop</ReturnToShopButton>
        <UpdateCartButton>Update Cart</UpdateCartButton>
      </CartActions>

      {/* Phần mã coupon và tổng giá trị giỏ hàng */}
      <CouponAndTotalContainer>
        <div>
          <CouponInput placeholder="Coupon Code" />
          <ApplyCouponButton>Apply Coupon</ApplyCouponButton>
        </div>
        <CartTotalContainer>
          <h3>Cart Total</h3>
          <CartTotalDetail>
            <span>Subtotal:</span>
            <span>${calculateSubtotal()}</span>
          </CartTotalDetail>
          <CartTotalDetail>
            <span>Shipping:</span>
            <span>Free</span>
          </CartTotalDetail>
          <CartTotalDetail>
            <span>Total:</span>
            <span>${total_price}</span>
          </CartTotalDetail>
          <ProceedToCheckoutButton>Proceed to checkout</ProceedToCheckoutButton>
        </CartTotalContainer>
      </CouponAndTotalContainer>
    </CartContainer>
  );
};

export default CartPage;
