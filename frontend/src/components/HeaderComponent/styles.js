import styled from "styled-components";
export const HeaderContainer = styled.header`
  background-color: #ffcc00;
  color: #333;
  padding: 15px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const HeaderInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 62em) {
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
export const Logo = styled.div`
  a {
    font-size: 24px;
    color: #333;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: #666;
    }
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

    @media (max-width: 768px) {
      width: 100%;
    }
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
`;

export const NavLinks = styled.nav`
  ul {
    list-style-type: none;
    align-items: center;
  }
  li {
    margin: 0 15px;
  }
  a {
    color: #333;
    text-decoration: none;
    font-size: 16px;
  }
  &:hover {
    color: #666;
  }
  @media (min-width: 62em) {
    ul {
      list-style-type: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        margin: 0 15px;

        a {
          color: #333;
          text-decoration: none;
          font-size: 16px;

          &:hover {
            color: #666;
          }
        }
      }
    }
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
    padding: 2px 8px;
    position: absolute;
    top: -5px;
    right: -10px;
  }
`;

export const ProfileMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
  .profile-icon {
    font-size: 24px;
    color: #333;
  }

  .profile-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    z-index: 1000;

    a {
      display: block;
      padding: 10px 20px;
      color: #333;
      text-decoration: none;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }

  &:hover .profile-dropdown {
    display: block;
  }
`;
export const NavItem = styled.li`
  margin: 0 15px;
  list-style-type: none;

  a {
    color: #333;
    text-decoration: none;
    font-size: 16px;

    &:hover {
      color: #666;
    }
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;
