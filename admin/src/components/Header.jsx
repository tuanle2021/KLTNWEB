import React from "react";
import { FaSearch, FaBars, FaMoon, FaBell, FaStream } from "react-icons/fa";
import {
  HeaderContainer,
  SearchInput,
  SearchButton,
  IconContainer,
  HeaderIcon,
  ProfileIconContainer,
  Button,
  SearchContainer,
  TopHeader,
} from "./styles";

const Header = ({ toggleSidebar }) => {
  return (
    <HeaderContainer>
      {/* Thanh tìm kiếm */}
      <SearchContainer>
        <SearchInput type="text" placeholder="Search term" />
        <SearchButton>
          <FaSearch />
        </SearchButton>
      </SearchContainer>

      <TopHeader>
        <Button onClick={toggleSidebar}>
          <FaStream />
        </Button>
        {/* Phần icon bên phải */}
        <IconContainer>
          <HeaderIcon>
            <FaMoon />
          </HeaderIcon>
          <HeaderIcon>
            <FaBell />
          </HeaderIcon>
          <span>English</span>
          <ProfileIconContainer>
            <img
              src="https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg"
              alt="Profile"
            />
          </ProfileIconContainer>
        </IconContainer>
      </TopHeader>
    </HeaderContainer>
  );
};

export default Header;
