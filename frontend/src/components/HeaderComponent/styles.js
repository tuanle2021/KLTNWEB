import styled from "styled-components";
export const HeaderContainer = styled.header`
  background-color: var(--light-blue-color);
  color: #333;
  padding: 15px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const HeaderInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 320px) {
    flex-direction: row;
    align-items: center;
    padding: 0 20px;
    flex-wrap: wrap;
    justify-content: center;
    text-decoration: none;
  }
`;
export const Link = styled.a`
  display: block;
  margin: 15px 0;
  color: #0e0620;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #2ccf6d;
  }
`;
export const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: var(--green-color);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #28b35d;
  }
`;
export const Logo = styled.a`
  font-size: 24px;
  color: #333;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #666;
  }
`;

export const SearchBar = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  input {
    padding: 8px;
    width: 300px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-right: 10px;
  }

  button {
    padding: 8px 16px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ShoppingCart = styled.div`
  position: relative;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    display: flex;
    align-items: center;

    i {
      font-size: 24px;
    }
  }

  .cart-count {
    background-color: #ff4136;
    color: #fff;
    font-size: 14px;
    border-radius: 50%;
    padding: 1px 6px;
    position: absolute;
    top: -5px;
    right: 0px;
  }
`;

// Container chính cho menu hồ sơ người dùng
export const ProfileMenu = styled.div`
  position: relative;
  display: inline-block;
`;

// Container cho icon người dùng
export const UserIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

// Container của dropdown
export const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background: linear-gradient(135deg, #ffffff, #e0e0e0);
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  padding: 15px 0;
  margin-top: 10px;
  display: none;
  z-index: 1;

  ${ProfileMenu}:hover & {
    display: block;
  }

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ffffff;
  }
`;
export const NavButton = styled.div`
  display: flex;

  @media (max-width: 320px) {
    display: inline;
  }
`;
// Item của dropdown
export const NavItem = styled.div`
  margin: 0;
  padding-left: 20px;
  list-style-type: none;
  display: flex;
  align-items: center;

  a {
    color: #333;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    align-items: center;
    width: 100%;

    &:hover {
      color: #e74c3c;
    }
  }

  .icon {
    margin-right: 10px;
    font-size: 20px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;
