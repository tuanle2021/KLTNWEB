import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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
import { updateOrder } from "../../redux/slices/orderSlice";
import {useNavigate} from "react-router-dom";
// Add this inside your CheckoutPage component
const initialOptions = {
  "client-id": "AbmCdXL179Ny3BNoTfT3tNdUeY41eMF77cOxElD41Njja6cBAHc1PqnoZ36aLwRwkuqrxoR-pBQUrZ3h",
  currency: "USD",
  locale: "en_US",
};


const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    streetAddress: "",
    city: "",
    country: "",
    phoneNumber: "",
    emailAddress: "",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState({ items: [] });

  const dispatch = useDispatch();

  useEffect(() => {
    const orderSummary = JSON.parse(Cookies.get("orderSummary") || "{}");
    if (!orderSummary.items) {
      orderSummary.items = [];
    }
    setOrderSummary(orderSummary);
    console.log(orderSummary);
  }, []);

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
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert("Transaction completed by " + details.payer.name.given_name);
      handlePlaceOrder().then(r => console.log(r));
    });
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      Cookies.set("user", JSON.stringify(formData));
    }
  };

  const calculateSubtotal = () => {
    return (
        orderSummary?.items?.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        ) || 0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + (orderSummary?.shipping || 0);
  };

  const handlePlaceOrder = async () => {
    try {

      const shippingAddress = `${formData.streetAddress}, ${formData.city}, ${formData.country}`;
      console.log(orderSummary);
      await dispatch(updateOrder({
        id: orderSummary._id,
        shipping_address: shippingAddress,
        items: orderSummary.items,
        payment_status: "completed",
      }));
      setOrderSuccess(true);
      navigate("/success");
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
      <div>
        <Roadmap />
        <CheckoutContainer>
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
          <OrderSummary>
            <h3>Order Summary</h3>
            {orderSummary?.items?.length > 0 ? (
                orderSummary.items.map((item, index) => (
                    <SummaryItem key={index}>
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </SummaryItem>
                ))
            ) : (
                <p>No items in the order summary.</p>
            )}
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
                <input type="radio" name="payment" value="cash" defaultChecked />
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
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: calculateTotal().toString(),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={handleApprove}
              />
            </PayPalScriptProvider>
          </OrderSummary>
        </CheckoutContainer>
      </div>
  );
};

export default CheckoutPage;