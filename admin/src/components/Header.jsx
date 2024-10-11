import React from "react";
import { FaSearch, FaBars, FaMoon, FaBell } from "react-icons/fa";
import {
  HeaderContainer,
  ColSearch,
  SearchForm,
  InputGroup,
  SearchInput,
  SearchButton,
  ColNav,
  NavList,
  NavItem,
  MenuLink,
} from "./styles";

const Header = () => {
  return (
    <HeaderContainer>
      <ColSearch>
        <SearchForm>
          <InputGroup>
            <SearchInput type="text" placeholder="Search term" />
            <SearchButton type="button">
              <FaSearch />
            </SearchButton>
          </InputGroup>
        </SearchForm>
      </ColSearch>
      <ColNav>
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <FaBars className="md-28" />
        </button>
        <NavList>
          <NavItem>
            <MenuLink to="#" title="Dark mode">
              <FaMoon />
            </MenuLink>
          </NavItem>
          <NavItem>
            <MenuLink to="#">
              <FaBell />
            </MenuLink>
          </NavItem>
          <NavItem>
            <MenuLink to="#">English</MenuLink>
          </NavItem>
          <NavItem className="dropdown">
            <MenuLink
              to="#"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                className="img-xs rounded-circle"
                src="/images/favicon.png"
                alt="User"
              />
            </MenuLink>
          </NavItem>
        </NavList>
      </ColNav>
    </HeaderContainer>
  );
};

export default Header;
