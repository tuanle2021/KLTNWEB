import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
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

const CartPage = ({}) => {
  const cartItems = [
    {
      id: "1",
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
      image: "https://via.placeholder.com/100?text=LCD+Monitor",
    },
    {
      id: "2",
      name: "Gamepad",
      price: 550,
      quantity: 2,
      image: "https://via.placeholder.com/100?text=Gamepad",
    },
  ];
  // State lưu trữ thông tin sản phẩm
  const [items, setItems] = useState(cartItems);

  // Hàm để cập nhật số lượng sản phẩm
  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = quantity;
    setItems(updatedItems);
  };

  // Tính tổng giá trị của giỏ hàng
  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContainer>
      {/* Phần tiêu đề giỏ hàng */}
      <CartHeader>
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Subtotal</span>
      </CartHeader>

      {/* Các sản phẩm trong giỏ hàng */}
      {items.map((item, index) => (
        <CartItemContainer key={item.id}>
          <RemoveButton onClick={() => console.log("Remove item")}>
            <IoIosCloseCircle size={20} color="#e74c3c" />
          </RemoveButton>
          <ProductImage src={item.image} alt={item.name} />
          <ProductName>{item.name}</ProductName>
          <ProductPrice>${item.price}</ProductPrice>
          <ProductQuantity
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(index, parseInt(e.target.value, 10))
            }
          />
          <ProductSubtotal>${item.price * item.quantity}</ProductSubtotal>
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
            <span>${calculateSubtotal()}</span>
          </CartTotalDetail>
          <ProceedToCheckoutButton>Proceed to checkout</ProceedToCheckoutButton>
        </CartTotalContainer>
      </CouponAndTotalContainer>
    </CartContainer>
  );
};

export default CartPage;
