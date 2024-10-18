import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateQuantity,
  toggleSelectItem,
  clearSelectedItems,
  updateCartItem,
  deleteCartItem,
} from "../../redux/slices/cartSlice";
import { fetchOrdersByUserId } from "../../redux/slices/orderSlice";
import {
  CartContainer,
  CartHeader,
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
import CartItem from "./CartItem";
import TableOrder from "./TableOrder";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, selectedItems, loading, error } = useSelector(
    (state) => state.cart
  );
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.orders);
  const user = useSelector((state) => state.auth.user);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    dispatch(getCart());
    if (user) {
      dispatch(fetchOrdersByUserId(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setQuantities(items.map((item) => item.quantity));
  }, [items]);

  const handleQuantityChange = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);
    if (selectedItems.includes(index)) {
      dispatch(updateQuantity({ index, quantity }));
    }
  };

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

  const calculateSubtotal = () => {
    return selectedItems.reduce(
      (acc, index) => acc + items[index].product.price * items[index].quantity,
      0
    );
  };

  const handleCheckout = () => {
    const selectedProducts = selectedItems.map((index) => ({
      product: items[index].product,
      quantity: items[index].quantity,
    }));
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    navigate("/checkout");
  };

  const handleRemoveItem = (id) => {
    dispatch(deleteCartItem(id));
    window.location.reload();
  };

  const handleReturnShop = () => {
    navigate("/");
  };

  if (loading || ordersLoading) {
    return <p>Loading...</p>;
  }

  if (error || ordersError) {
    return (
      <p>
        Error:{" "}
        {error?.message ||
          error?.toString() ||
          ordersError?.message ||
          ordersError?.toString()}
      </p>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <span>Image</span>
        <span>Product</span>
        <span>Price</span>
        <span>Subtotal</span>
        <span>Quantity</span>
      </CartHeader>

      {items.map((item, index) => (
        <CartItem
          key={item.product._id}
          item={item}
          index={index}
          selectedItems={selectedItems}
          quantities={quantities}
          handleSelectItem={handleSelectItem}
          handleQuantityChange={handleQuantityChange}
          handleRemoveItem={handleRemoveItem}
        />
      ))}

      <CartActions>
        <ReturnToShopButton onClick={handleReturnShop}>
          Return To Shop
        </ReturnToShopButton>
        <UpdateCartButton onClick={handleUpdateCart}>
          Update Cart
        </UpdateCartButton>
      </CartActions>

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
          <ProceedToCheckoutButton
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
          >
            Proceed to checkout
          </ProceedToCheckoutButton>
        </CartTotalContainer>
      </CouponAndTotalContainer>
      <h3>Your Orders Not Paid</h3>
      <TableOrder orders={orders} status={true} />
    </CartContainer>
  );
};

export default CartPage;
