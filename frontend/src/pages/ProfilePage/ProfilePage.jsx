import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import {
  ProfileContainer,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  ProfileForm,
} from "./styles";
import { MyProfile, AddressBook, PaymentOptions } from "./Account";
import { updateProfile } from "../../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUserId } from "../../redux/slices/orderSlice";
import OrderListComponent from "../../components/Profile/OrderList";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await dispatch(updateProfile(profile)).unwrap();
      alert("Profile saved successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchOrdersByUserId(user.id));
    }
  }, [dispatch, user]);

  const renderForm = () => {
    const hash = location.hash.replace("#", "");
    const filteredOrders = orders.filter(
        (order) => order.status === hash.toLowerCase()
    );

    switch (hash) {
      case "my-profile":
        return (
            <MyProfile
                profile={profile}
                handleChange={handleChange}
                handleSaveChanges={handleSaveChanges}
            />
        );
      case "address-book":
        return <AddressBook />;
      case "my-payment-options":
        return <PaymentOptions />;
      case "processing":
      case "shipped":
      case "cancelled":
      case "awaiting_payment":
        return (
            <OrderListComponent title={hash} orders={filteredOrders} />
        );
      case "my-wishlist":
        return (
            <ProfileForm>
              <h2>My WishList</h2>
            </ProfileForm>
        );
      default:
        return null;
    }
  };

  return (
      <div>
        <Roadmap />
        <ProfileContainer>
          <Sidebar>
            <SidebarGroup>
              <h4>My Account</h4>
              <SidebarItem
                  className={location.hash === "#my-profile" ? "active" : ""}
                  onClick={() => (window.location.hash = "#my-profile")}
              >
                My Profile
              </SidebarItem>
              <SidebarItem
                  className={location.hash === "#address-book" ? "active" : ""}
                  onClick={() => (window.location.hash = "#address-book")}
              >
                Address Book
              </SidebarItem>
              <SidebarItem
                  className={location.hash === "#my-payment-options" ? "active" : ""}
                  onClick={() => (window.location.hash = "#my-payment-options")}
              >
                My Payment Options
              </SidebarItem>
            </SidebarGroup>

            <SidebarGroup>
              <h4>My Orders</h4>
              <SidebarItem
                  className={location.hash === "#awaiting_payment" ? "active" : ""}
                  onClick={() => (window.location.hash = "#awaiting_payment")}
              >
                Awaiting Payment
              </SidebarItem>
              <SidebarItem
                  className={location.hash === "#processing" ? "active" : ""}
                  onClick={() => (window.location.hash = "#processing")}
              >
                Processing
              </SidebarItem>
              <SidebarItem
                  className={location.hash === "#shipped" ? "active" : ""}
                  onClick={() => (window.location.hash = "#shipped")}
              >
                Shipped
              </SidebarItem>
              <SidebarItem
                  className={location.hash === "#cancelled" ? "active" : ""}
                  onClick={() => (window.location.hash = "#cancelled")}
              >
                Cancelled
              </SidebarItem>
            </SidebarGroup>

            <SidebarGroup>
              <h4>My WishList</h4>
              <SidebarItem
                  className={location.hash === "#my-wishlist" ? "active" : ""}
                  onClick={() => (window.location.hash = "#my-wishlist")}
              >
                My WishList
              </SidebarItem>
            </SidebarGroup>
          </Sidebar>

          {renderForm()}
        </ProfileContainer>
      </div>
  );
};

export default ProfilePage;