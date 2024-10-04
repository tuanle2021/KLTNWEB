import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateQuantity,
  toggleSelectItem,
  clearSelectedItems,
  updateCartItem,
} from "../../redux/slices/cartSlice";
import { setOrderItems } from "../../redux/slices/orderSlice";
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
  SelectItemCheckbox,
} from "./styles";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, selectedItems, loading, error } = useSelector(
    (state) => state.cart
  );
  const [quantities, setQuantities] = useState([]);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    setQuantities(items.map((item) => item.quantity));
  }, [items]);

  // Hàm để cập nhật số lượng sản phẩm
  const handleQuantityChange = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);
    if (selectedItems.includes(index)) {
      dispatch(updateQuantity({ index, quantity }));
    }
  };

  // Hàm để chọn sản phẩm
  const handleSelectItem = (index) => {
    dispatch(toggleSelectItem({ index }));
  };

  const handleUpdateCart = () => {
    selectedItems.forEach((index) => {
      const item = items[index];
      dispatch(updateCartItem({ id: item._id, quantity: quantities[index] }));
    });
    window.location.reload();
  };
  // Tính tổng giá trị của giỏ hàng
  const calculateSubtotal = () => {
    return selectedItems.reduce(
      (acc, index) => acc + items[index].product.price * items[index].quantity,
      0
    );
  };

  // Hàm xử lý sự kiện checkout
  const handleCheckout = () => {
    const selectedProducts = selectedItems.map((index) => items[index]);
    dispatch(setOrderItems({ items: selectedProducts, shipping_address: "" }));
    dispatch(clearSelectedItems());
    navigate("/checkout");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message || error.toString()}</p>;
  }

  return (
    <CartContainer>
      {/* Phần tiêu đề giỏ hàng */}
      <CartHeader>
        <span>Image</span>
        <span>Product</span>
        <span>Price</span>
        <span>Subtotal</span>
        <span>Quantity</span>
      </CartHeader>

      {/* Các sản phẩm trong giỏ hàng */}
      {items.map((item, index) => (
        <CartItemContainer key={item.product._id}>
          <SelectItemCheckbox
            type="checkbox"
            checked={selectedItems.includes(index)}
            onChange={() => handleSelectItem(index)}
          />
          <RemoveButton onClick={() => console.log("Remove item")}>
            <IoIosCloseCircle size={20} color="#e74c3c" />
          </RemoveButton>
          <ProductImage src={item.product.images[0]} alt={item.product.name} />
          <ProductName>{item.product.name}</ProductName>
          <ProductPrice>${item.product.price}</ProductPrice>
          <ProductSubtotal>
            ${item.product.price * item.quantity}
          </ProductSubtotal>
          <ProductQuantity
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(index, parseInt(e.target.value, 10))
            }
            disabled={!selectedItems.includes(index)}
          />
        </CartItemContainer>
      ))}

      {/* Các hành động như mã coupon và quay lại shop */}
      <CartActions>
        <ReturnToShopButton>Return To Shop</ReturnToShopButton>
        <UpdateCartButton onClick={handleUpdateCart}>
          Update Cart
        </UpdateCartButton>
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
            <span>${calculateSubtotal()}</span>{" "}
            {/* Tạm thời chưa tính phí ship và giảm giá*/}
          </CartTotalDetail>
          <ProceedToCheckoutButton
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
          >
            Proceed to checkout
          </ProceedToCheckoutButton>
        </CartTotalContainer>
      </CouponAndTotalContainer>
    </CartContainer>
  );
};

export default CartPage;
