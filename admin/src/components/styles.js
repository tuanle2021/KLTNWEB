import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
export const SidebarContainer = styled.div`
  max-width: 260px;
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
  background-color: #343a40;
  box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.075);
  z-index: 10;
  border-right: 1px solid rgba(108, 117, 125, 0.25);
`;

export const AsideTop = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BrandWrap = styled(Link)`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: inline-block;
`;

export const Logo = styled.img`
  height: 46px;
`;

export const MinimizeButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  font-size: 20px;
`;

export const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
  }
`;

export const MenuItem = styled.li`
  margin-bottom: 10px;
`;

export const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  &:hover {
    background-color: #495057;
  }
  &.active {
    background-color: #007bff;
  }
`;

export const Icon = styled.i`
  margin-right: 10px;
`;

export const Text = styled.span`
  font-size: 16px;
`;

/* ------------- header styles ----------- */
export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  min-height: 72px;
  background-color: #fff;
  border-bottom: 1px solid rgba(108, 117, 125, 0.25);
`;

export const ColSearch = styled.div`
  flex-grow: 0.5;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
`;

export const ColNav = styled.div`
  display: flex;
  align-items: center;
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  margin-left: 1rem;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid rgba(108, 117, 125, 0.25);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  display: none;

  ${NavItem}:hover & {
    display: block;
  }
`;

export const DropdownItem = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  color: #29335d;
  text-decoration: none;

  &:hover {
    background-color: #e9ecef;
    color: #4fa607;
  }
`;
