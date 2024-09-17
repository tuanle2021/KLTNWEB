import React from "react";
import { Col } from "antd";
import {
  HeaderContainer,
  HeaderInner,
  Logo,
  SearchBar,
  NavLinks,
  ShoppingCart,
} from "./styles";
import Search from "antd/es/transfer/search";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
const HeaderComponent = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        {/* Logo Section */}
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
              <a href="/new-arrivals">New Arrivals</a>
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
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">3</span>{" "}
            {/* Dynamic cart item count */}
          </a>
        </ShoppingCart>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default HeaderComponent;
