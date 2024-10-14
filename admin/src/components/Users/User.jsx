import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/userSlice";
import styled from "styled-components";
import {
  SellersContainer,
  SellersGrid,
  SellerCard,
  SellerImage,
  SellerInfo,
  SellerName,
  SellerEmail,
  SellerID,
  ProfileButton,
  SellerHeader,
  SearchContainer,
  SelectGroup,
  CreateButton,
} from "./styles";

const User = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <SellersContainer>
      <div className="header">
        <h2>Sellers</h2>
        <CreateButton>Create new</CreateButton>
      </div>

      {/* Thanh tìm kiếm và lựa chọn */}
      <SearchContainer>
        <input type="text" placeholder="Search" />
        <SelectGroup>
          <select>
            <option>Show 20</option>
          </select>
          <select>
            <option>Date</option>
          </select>
        </SelectGroup>
      </SearchContainer>

      {/* Danh sách người bán */}
      <SellersGrid>
        {users.map((seller, index) => (
          <SellerCard key={index}>
            <SellerHeader />
            <SellerImage
              src="https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg"
              alt={seller.name}
            />
            <SellerInfo>
              <SellerName>{seller.name}</SellerName>
              <SellerID>ID: {seller._id}</SellerID>
              <SellerEmail>{seller.email}</SellerEmail>
              <ProfileButton>Profile</ProfileButton>
            </SellerInfo>
          </SellerCard>
        ))}
      </SellersGrid>
    </SellersContainer>
  );
};

export default User;
