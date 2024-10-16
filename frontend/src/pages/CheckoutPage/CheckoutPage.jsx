import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import {
  CheckoutContainer,
  BillingDetails,
  OrderSummary,
  FormInput,
  PaymentMethod,
  CouponContainer,
  PlaceOrderButton,
  SummaryItem,
  CheckboxLabel,
  OrderSuccessContainer,
  SuccessMessage,
  OrderDetails,
  BackToHomeButton,
} from "./styles";
import { createOrder } from "../../redux/slices/orderSlice";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    street: "",
    city: "",
    country: "",
    phoneNumber: "",
    emailAddress: "",
  });
  const [orderSuccess, setOrderSuccess] = useState(false); // State để kiểm tra trạng thái đặt hàng thành công

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderSummary, items, shipping_address } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};
    setFormData({
      firstName: userData.name || "",
      streetAddress: userData.address.street || "",
      city: userData.address.city || "",
      country: userData.address.country || "",
      phoneNumber: userData.phone || "",
      emailAddress: userData.email || "",
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      Cookies.set("user", JSON.stringify(formData));
    }
  };

  const calculateSubtotal = () => {
    return (
      orderSummary?.items?.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ) || 0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + (orderSummary?.shipping || 0);
  };

  const handlePlaceOrder = async () => {
    try {
      // Dispatch action để tạo đơn hàng
      await dispatch(createOrder());
      // Thay đổi trạng thái orderSuccess khi đặt hàng thành công
      setOrderSuccess(true);
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div>
      {/* Roadmap hiển thị đường dẫn */}
      <Roadmap />

      <CheckoutContainer>
        {/* Billing Details Section */}
        <BillingDetails>
          <h2>Billing Details</h2>
          <FormInput>
            <label>Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </FormInput>

          <FormInput>
            <label>Street Address*</label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              required
            />
          </FormInput>
          <FormInput>
            <label>City*</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </FormInput>
          <FormInput>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </FormInput>
          <FormInput>
            <label>Phone Number*</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </FormInput>
          <FormInput>
            <label>Email Address*</label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              required
            />
          </FormInput>
          <CheckboxLabel>
            <input type="checkbox" onChange={handleCheckboxChange} />
            Save this information for faster check-out next time
          </CheckboxLabel>
        </BillingDetails>

        {/* Order Summary Section */}
        <OrderSummary>
          <h3>Order Summary</h3>
          {orderSummary?.items?.map((item, index) => (
            <SummaryItem key={index}>
              <span>{item.product.name}</span>
              <span>${item.product.price}</span>
            </SummaryItem>
          ))}
          <SummaryItem>
            <span>Subtotal:</span>
            <span>${calculateSubtotal()}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Shipping:</span>
            <span>{orderSummary?.shipping}</span>
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

          <PlaceOrderButton onClick={handlePlaceOrder}>
            Place Order
          </PlaceOrderButton>
        </OrderSummary>
      </CheckoutContainer>
      <OrderSuccessContainer>
        <SuccessMessage>Order Placed Successfully!</SuccessMessage>
        <OrderDetails>
          Your order has been placed and is being processed.
        </OrderDetails>
        <a href="/">
          <BackToHomeButton>Back to Home</BackToHomeButton>
        </a>
      </OrderSuccessContainer>
    </div>
  );
};

export default CheckoutPage;
