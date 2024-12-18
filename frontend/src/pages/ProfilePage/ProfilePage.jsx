import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import {
  ProfileContainer,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  ProfileForm,
  WishlistContainer,
  WishlistItem,
  WishlistImage,
  WishlistDetails,
  WishlistName,
  WishlistPrice,
} from "./styles";
import { MyProfile, AddressBook, PaymentOptions } from "./Account";
import { updateProfile } from "../../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUserId } from "../../redux/slices/orderSlice";
import { getFavorites } from "../../redux/slices/favoriteSlice"; // Import action để lấy danh sách sản phẩm yêu thích
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
  const { favorites } = useSelector((state) => state.favorites); // Lấy danh sách sản phẩm yêu thích từ state

  const [selectedItem, setSelectedItem] = useState("My Profile");
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
      dispatch(getFavorites());
    }
  }, [dispatch, user]);
  console.log(orders);
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
      case "Processing":
      case "Shipped":
      case "Cancelled":
      case "awaiting_payment":
        return (
            <OrderListComponent title={hash} orders={filteredOrders} />
        );
      case "my-wishlist":
        return (
          <ProfileForm>
            <h2>My WishList</h2>
            <WishlistContainer>
              {favorites.map((product) => {
                const now = new Date();
                const isDiscountValid =
                  product.discount &&
                  new Date(product.discountStartDate) <= now &&
                  new Date(product.discountEndDate) >= now;
                const discountedPrice = isDiscountValid
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;

                return (
                  <WishlistItem key={product._id}>
                    <WishlistImage src={product.images[0]} alt={product.name} />
                    <WishlistDetails>
                      <WishlistName>{product.name}</WishlistName>
                      <WishlistPrice>
                        {isDiscountValid ? (
                          <>
                            <span
                              style={{
                                textDecoration: "line-through",
                                color: "#999",
                              }}
                            >
                              ${product.price.toFixed(2)}
                            </span>{" "}
                            <span style={{ color: "#e91e63" }}>
                              ${discountedPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </WishlistPrice>
                    </WishlistDetails>
                  </WishlistItem>
                );
              })}
            </WishlistContainer>
          </ProfileForm>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Roadmap hiển thị đường dẫn */}
      <Roadmap />
      <ProfileContainer>
        {/* Sidebar chứa các mục quản lý tài khoản */}
        <Sidebar>
          <SidebarGroup>
            <h4>My Account</h4>
            <SidebarItem
              className={selectedItem === "My Profile" ? "active" : ""}
              onClick={() => setSelectedItem("My Profile")}
            >
              My Profile
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup>
            <h4>My Orders</h4>
            <SidebarItem
              className={selectedItem === "awaiting_payment" ? "active" : ""}
              onClick={() => setSelectedItem("awaiting_payment")}
            >
              Awaiting Payment
            </SidebarItem>
            <SidebarItem
              className={selectedItem === "Processing" ? "active" : ""}
              onClick={() => setSelectedItem("Processing")}
            >
              Processing
            </SidebarItem>
            <SidebarItem
              className={selectedItem === "Shipped" ? "active" : ""}
              onClick={() => setSelectedItem("Shipped")}
            >
              Shipped
            </SidebarItem>
            <SidebarItem
              className={selectedItem === "Cancelled" ? "active" : ""}
              onClick={() => setSelectedItem("Cancelled")}
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