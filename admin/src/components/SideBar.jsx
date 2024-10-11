import React from "react";
import {
  FaHome,
  FaCartPlus,
  FaList,
  FaShoppingBag,
  FaUser,
  FaStream,
  FaStoreAlt,
} from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import { IoLogoUsd } from "react-icons/io";

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
} from "./styles";
const Sidebar = () => {
  return (
    <SidebarContainer>
      <AsideTop>
        <BrandWrap to="/">
          <Logo src="../../../public/logo192.png" alt="Ecommerce dashboard " />
        </BrandWrap>
        <div>
          <MinimizeButton>
            <FaStream />
          </MinimizeButton>
        </div>
      </AsideTop>

      <Nav>
        <ul>
          <MenuItem>
            <MenuLink to="/" exact>
              <Icon>
                <FaHome />
              </Icon>
              <Text>Dashboard</Text>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/products">
              <Icon>
                <FaShoppingBag />
              </Icon>
              <Text>Products</Text>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/addproduct">
              <Icon>
                <FaCartPlus />
              </Icon>
              <Text>Add product</Text>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/category">
              <Icon>
                <FaList />
              </Icon>
              <Text>Categories</Text>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/orders">
              <Icon>
                <BiSolidShoppingBags />
              </Icon>
              <Text>Orders</Text>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/users">
              <Icon>
                {" "}
                <FaUser />
              </Icon>
              <Text>Users</Text>
            </MenuLink>
          </MenuItem>
          {/* <MenuItem>
            <MenuLink to="/sellers" className="disabled">
              <Icon>
                {" "}
                <FaStoreAlt />
              </Icon>
              <Text>Sellers</Text>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/transaction" className="disabled">
              <Icon>
                <IoLogoUsd />
              </Icon>
              <Text>Transactions</Text>
            </MenuLink>
          </MenuItem> */}
        </ul>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
