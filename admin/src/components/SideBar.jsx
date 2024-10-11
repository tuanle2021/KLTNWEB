import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaCartPlus,
  FaList,
  FaShoppingBag,
  FaUser,
  FaStream,
} from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";

import {
  SidebarContainer,
  AsideTop,
  BrandWrap,
  Logo,
  MinimizeButton,
  Nav,
  MenuItem,
  MenuLink,
  Icon,
  Text,
  Overlay,
} from "./styles";

const Sidebar = ({ isMobile, isMinimized, toggleSidebar, toggleMinimize }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobile) {
        toggleSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, toggleSidebar]);

  return (
    <>
      <SidebarContainer isMinimized={isMinimized} isMobile={isMobile}>
        <AsideTop>
          {!isMinimized && <BrandWrap to="/">Admin</BrandWrap>}
          <div>
            <MinimizeButton onClick={toggleMinimize}>
              <FaStream fontSize={25} />
            </MinimizeButton>
          </div>
        </AsideTop>

        <Nav>
          <ul>
            <MenuItem>
              <MenuLink isMinimized={isMinimized} to="/" exact>
                <Icon>
                  <FaHome fontSize={25} />
                </Icon>
                {!isMinimized && <Text>Dashboard</Text>}
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink isMinimized={isMinimized} to="/products">
                <Icon>
                  <FaShoppingBag fontSize={25} />
                </Icon>
                {!isMinimized && <Text>Products</Text>}
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink isMinimized={isMinimized} to="/addproduct">
                <Icon>
                  <FaCartPlus fontSize={25} />
                </Icon>
                {!isMinimized && <Text>Add product</Text>}
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink isMinimized={isMinimized} to="/category">
                <Icon>
                  <FaList fontSize={25} />
                </Icon>
                {!isMinimized && <Text>Categories</Text>}
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink isMinimized={isMinimized} to="/orders">
                <Icon>
                  <BiSolidShoppingBags fontSize={25} />
                </Icon>
                {!isMinimized && <Text>Orders</Text>}
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink isMinimized={isMinimized} to="/users">
                <Icon>
                  <FaUser fontSize={25} />
                </Icon>
                {!isMinimized && <Text>Users</Text>}
              </MenuLink>
            </MenuItem>
          </ul>
        </Nav>
      </SidebarContainer>
      {isMobile && <Overlay onClick={toggleSidebar} />}
    </>
  );
};

export default Sidebar;
