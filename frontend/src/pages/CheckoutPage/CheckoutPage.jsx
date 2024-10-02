import React, { useState } from "react";
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
} from "./styles";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            <label>First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </FormInput>
          <FormInput>
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
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
            <label>Apartment, floor, etc. (optional)</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
            />
          </FormInput>
          <FormInput>
            <label>Town/City*</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
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
            <input type="checkbox" />
            Save this information for faster check-out next time
          </CheckboxLabel>
        </BillingDetails>

        {/* Order Summary Section */}
        <OrderSummary>
          <h3>Order Summary</h3>
          <SummaryItem>
            <span>LCD Monitor</span>
            <span>$650</span>
          </SummaryItem>
          <SummaryItem>
            <span>H1 Gamepad</span>
            <span>$1100</span>
          </SummaryItem>
          <SummaryItem>
            <span>Subtotal:</span>
            <span>$1750</span>
          </SummaryItem>
          <SummaryItem>
            <span>Shipping:</span>
            <span>Free</span>
          </SummaryItem>
          <SummaryItem>
            <span>Total:</span>
            <span>$1750</span>
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

          <PlaceOrderButton>Place Order</PlaceOrderButton>
        </OrderSummary>
      </CheckoutContainer>
    </div>
  );
};

export default CheckoutPage;
