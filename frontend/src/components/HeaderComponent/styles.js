import styled from "styled-components";
export const HeaderContainer = styled.header`
  background-color: #ffcc00;
  color: #333;
  padding: 15px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
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
    display: flex;

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

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;

      li {
        margin: 10px 0;
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
