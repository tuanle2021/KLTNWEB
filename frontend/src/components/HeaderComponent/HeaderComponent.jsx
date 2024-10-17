import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import CategoryMenu from "../Category/CategoryMenu";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import {
  HeaderContainer,
  HeaderInner,
  Logo,
  SearchBar,
  NavItem,
  ShoppingCart,
  ProfileMenu,
  Button,
  UserIconWrapper,
  DropdownContainer,
  NavButton,
} from "./styles";
import {
  InboxOutlined,
  CloseCircleOutlined,
  StarOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
} from "@ant-design/icons";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderInner>
          <Logo href="/">
            <ShopOutlined style={{ fontSize: "2em", marginRight: "10px" }} />
          </Logo>
          <CategoryMenu />
          {/* Search Bar */}
          <SearchBar>
            <input type="text" placeholder="Search for tech products..." />
            <button type="submit">
              <IoSearch />
            </button>
          </SearchBar>

          {/* Shopping Cart */}
          <ShoppingCart>
            <a href="/cart">
              <ShoppingCartOutlined
                style={{
                  fontSize: "1.5em",
                  marginRight: "10px",
                  color: "var(--dark-bg-third)",
                }}
              />
              <span className="cart-count">3</span>
              {/* Dynamic cart item count */}
            </a>
          </ShoppingCart>

          {/* Profile Menu */}
          <ProfileMenu>
            {user ? (
              <>
                <ProfileMenu>
                  <UserIconWrapper>
                    <UserOutlined />
                    <DownOutlined className="dropdown-icon" />
                  </UserIconWrapper>
                  <DropdownContainer className="profile-dropdown">
                    <NavItem>
                      <Link to="/profile">
                        <i className="icon">
                          <UserOutlined />
                        </i>{" "}
                        My Account
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/orders">
                        <i className="icon">
                          <InboxOutlined />
                        </i>{" "}
                        My Order
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/cancellations">
                        <i className="icon">
                          <CloseCircleOutlined />
                        </i>{" "}
                        My Cancellations
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/reviews">
                        <i className="icon">
                          <StarOutlined />
                        </i>{" "}
                        My Reviews
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/" onClick={handleLogout}>
                        <i className="icon">
                          <LogoutOutlined />
                        </i>{" "}
                        Logout
                      </Link>
                    </NavItem>
                  </DropdownContainer>
                </ProfileMenu>
              </>
            ) : (
              <NavButton>
                <NavItem>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/login?register=true">
                    <Button>Register</Button>
                  </Link>
                </NavItem>
              </NavButton>
            )}
          </ProfileMenu>
        </HeaderInner>
      </div>
    </HeaderContainer>
  );
};

export default HeaderComponent;
