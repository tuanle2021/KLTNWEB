import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slides/authSlice";
import { Link } from "react-router-dom";
import {
  HeaderContainer,
  HeaderInner,
  Logo,
  SearchBar,
  NavLinks,
  NavItem,
  ShoppingCart,
  ProfileMenu,
  Button,
  UserIconWrapper,
  DropdownContainer,
} from "./styles";
import {
  InboxOutlined,
  CloseCircleOutlined,
  StarOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  ShoppingCartOutlined,
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
          <Logo>
            <a href="/">
              <img
                src="/images/logo-Ecommerce.png"
                alt="TechShop Logo"
                style={{ height: "40px" }}
              />
            </a>
          </Logo>

          {/* Search Bar */}
          <SearchBar>
            <input type="text" placeholder="Search for tech products..." />
            <button type="submit">Search</button>
          </SearchBar>

          {/* Navigation Links */}
          <NavLinks>
            <ul>
              <li>
                <a href="/categories">Categories</a>
              </li>
              <li>
                <a href="/deals">Deals</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
            </ul>
          </NavLinks>

          {/* Shopping Cart */}
          <ShoppingCart>
            <a href="/cart">
              <ShoppingCartOutlined
                style={{ fontSize: "1.7em", marginRight: "10px" }}
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
              <>
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
              </>
            )}
          </ProfileMenu>
        </HeaderInner>
      </div>
    </HeaderContainer>
  );
};

export default HeaderComponent;
