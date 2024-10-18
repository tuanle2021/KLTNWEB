import React, { useState, useEffect } from "react";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import {
  CheckoutContainer,
  OrderSummary,
  PaymentMethod,
  CouponContainer,
  SummaryItem,
  OrderDetailRow,
  OrderDetailCol,
  OrderBox,
  OrderBoxContent,
  OrderBoxTitle,
  OrderBoxText,
  PayPalButtonContainer,
} from "./styles";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FaUser, FaTruckField } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import CartItem from "../CartPage/CartItem";

const OrderPage = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    street: "123 Main St",
    city: "New York",
    country: "USA",
    phoneNumber: "1234567890",
    emailAddress: "john@example.com",
  });
  const [sdkReady, setSdkReady] = useState(true);
  const [orderItems, setOrderItems] = useState([]); // State để lưu trữ sản phẩm đã chọn

  useEffect(() => {
    const selectedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];
    setOrderItems(selectedProducts);
  }, []);

  const userInfo = {
    name: "John Doe",
    email: "john@example.com",
  };

  const cart = {
    shippingAddress: {
      country: "USA",
      city: "New York",
      address: "123 Main St",
      postalCode: "10001",
    },
    paymentMethod: "PayPal",
  };

  const calculateSubtotal = () => {
    return (
      orderItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ) || 0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    // Xử lý kết quả thanh toán thành công
  };

  return (
    <PayPalScriptProvider>
      <div>
        {/* Roadmap hiển thị đường dẫn */}
        <Roadmap />
        <div className="container">
          <OrderDetailRow>
            <OrderDetailCol>
              <OrderBox>
                <FaUser style={{ color: "#0F5132", fontSize: "27px" }} />
              </OrderBox>
              <OrderBoxContent>
                <OrderBoxTitle>Customer</OrderBoxTitle>
                <OrderBoxText>{userInfo.name}</OrderBoxText>
                <OrderBoxText>{userInfo.email}</OrderBoxText>
              </OrderBoxContent>
            </OrderDetailCol>
            <OrderDetailCol>
              <OrderBox>
                <FaTruckField style={{ color: "#0F5132", fontSize: "29px" }} />
              </OrderBox>
              <OrderBoxContent>
                <OrderBoxTitle>Order info</OrderBoxTitle>
                <OrderBoxText>
                  Shipping: {cart.shippingAddress.country}
                </OrderBoxText>
                <OrderBoxText>Pay method: {cart.paymentMethod}</OrderBoxText>
              </OrderBoxContent>
            </OrderDetailCol>
            <OrderDetailCol>
              <OrderBox>
                <FaMapMarkerAlt
                  style={{ color: "#0F5132", fontSize: "27px" }}
                />
              </OrderBox>
              <OrderBoxContent>
                <OrderBoxTitle>Deliver to</OrderBoxTitle>
                <OrderBoxText>
                  Address: {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.postalCode}
                </OrderBoxText>
              </OrderBoxContent>
            </OrderDetailCol>
          </OrderDetailRow>

          <CheckoutContainer>
            {orderItems.length === 0 ? (
              <OrderBoxTitle>Your order is empty</OrderBoxTitle>
            ) : (
              <>
                {" "}
                {orderItems.map((item, index) => (
                  <CartItem
                    key={item.product._id}
                    item={item}
                    index={index}
                    selectedItems={[]}
                    quantities={[]}
                    handleSelectItem={() => {}}
                    handleQuantityChange={() => {}}
                    handleRemoveItem={() => {}}
                  />
                ))}
              </>
            )}

            <OrderSummary>
              <h3>Order Summary</h3>
              <SummaryItem>
                <span>Subtotal:</span>
                <span>${calculateSubtotal()}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Shipping:</span>
                <span>Free</span>
              </SummaryItem>
              <SummaryItem>
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </SummaryItem>

              <PaymentMethod>
                <label>
                  <input type="radio" name="payment" value="bank" />
                  Bank
                  <img src="/images/payment-icons.png" alt="Payment Methods" />
                </label>
                <label>
                  <input type="radio" name="payment" value="cash" />
                  Cash on delivery
                </label>
              </PaymentMethod>

              <CouponContainer>
                <input type="text" placeholder="Coupon Code" />
                <button>Apply Coupon</button>
              </CouponContainer>

              <PayPalButtonContainer>
                <PayPalButtons
                  amount={calculateTotal()}
                  onSuccess={successPaymentHandler}
                />
              </PayPalButtonContainer>
            </OrderSummary>
          </CheckoutContainer>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default OrderPage;
