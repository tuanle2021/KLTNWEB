import React from "react";
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

const sellersData = [
  {
    id: 478,
    name: "Leslie Alexander",
    email: "leslie@example.com",
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    id: 122,
    name: "John Mike",
    email: "john@mysite.com",
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    id: 478,
    name: "Leslie Alexander",
    email: "leslie@example.com",
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    id: 478,
    name: "Leslie Alexander",
    email: "leslie@example.com",
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    id: 478,
    name: "Leslie Alexander",
    email: "leslie@example.com",
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    id: 478,
    name: "Leslie Alexander",
    email: "leslie@example.com",
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
];

const User = () => {
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
        {sellersData.map((seller, index) => (
          <SellerCard key={index}>
            <SellerHeader />
            <SellerImage src={seller.image} alt={seller.name} />
            <SellerInfo>
              <SellerName>{seller.name}</SellerName>
              <SellerID>Seller ID: #{seller.id}</SellerID>
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
