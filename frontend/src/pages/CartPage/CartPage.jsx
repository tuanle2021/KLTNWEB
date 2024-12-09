import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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
  setOrderItems,
  createOrder,
  setOrderSummary,
} from "../../redux/slices/orderSlice";
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
import Loading from "../../components/LoadingError/Loading";

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
  const orderSummary = useSelector((state) => state.orders.orderSummary);
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

  useEffect(() => {
    if (orderSummary) {
      console.log(orderSummary);
    }
  }, [orderSummary]);

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
      if (item && item._id) {
        dispatch(updateCartItem({ id: item._id, quantity: quantities[index] }));
      }
    });
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((acc, index) => {
      const item = items[index];
      if (item && item.product && item.product.price) {
        return acc + item.product.price * quantities[index];
      }
      return acc;
    }, 0);
  };

  const handleCheckout = async () => {
    const selectedProducts = selectedItems.map((index) => ({
      product: items[index].product,
      quantity: items[index].quantity,
    }));
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    navigate("/checkout");
    const orderData = {
      items: selectedProducts,
      shipping_address: " ",
    };
    dispatch(setOrderItems(selectedProducts));
    try {
      const order = await dispatch(createOrder(orderData)).unwrap();
      dispatch(setOrderSummary(order));
      Cookies.set("orderSummary", JSON.stringify(order));
      dispatch(clearSelectedItems());
      navigate("/checkout");
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(deleteCartItem(id));
  };

  const handleReturnShop = () => {
    navigate("/");
  };

  return (
    <CartContainer>
      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Error:{" "}
          {error?.message ||
            error?.toString() ||
            ordersError?.message ||
            ordersError?.toString()}
        </p>
      )}
      <CartHeader>
        <span>Image</span>
        <span>Product</span>
        <span>Price</span>
        <span>Subtotal</span>
        <span>Quantity</span>
      </CartHeader>
      {items.map(
        (item, index) =>
          item.product &&
          item.product._id && (
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
          )
      )}
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
    </CartContainer>
  );
};

export default CartPage;
