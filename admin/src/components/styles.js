import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
export const SidebarContainer = styled.div`
  max-width: ${(props) => (props.isMinimized ? "60px" : "260px")};
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
  transition: max-width 0.3s ease, left 0.3s ease;
  left: ${(props) => (props.isMobile ? "-260px" : "0")};
  @media (max-width: 768px) {
    transition: max-width 0.3s ease, left 0.3s ease;
    left: ${(props) => (props.isMobile ? "0" : "-260px")};
  }
`;
export const ContentWrapper = styled.div`
  margin-left: ${(props) => (props.isMinimized ? "80px" : "260px")};
  padding: 20px;
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
export const AsideTop = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BrandWrap = styled(Link)`
  padding: 1rem;
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: #343a40;
  &:hover {
    color: #007bff;
  }
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
export const Button = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    background: none;
    border: none;
    color: #6c757d;
    font-size: 20px;
  }
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
  justify-content: ${(props) => (props.isMinimized ? "center" : "flex-start")};
  color: #fff;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  &:hover {
    background-color: #495057;
  }
  &.active {
    background-color: #007bff;
    border-radius: 8px;
  }
`;

export const Icon = styled.i`
  margin-right: ${(props) => (props.isMinimized ? "0" : "10px")};
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: ${(props) => (props.isMobile ? "block" : "none")};
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
