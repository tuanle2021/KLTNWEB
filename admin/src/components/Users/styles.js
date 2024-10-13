import styled from "styled-components";

// Container chính của Sellers
export const SellersContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 97%;
  margin: auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 24px;
    font-weight: 500;
  }
`;

// Thanh tìm kiếm và các tùy chọn
export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 250px;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: #007bff;
    }
  }
`;

// Nhóm Select box
export const SelectGroup = styled.div`
  display: flex;
  gap: 10px;

  select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
  }
`;

// Nút tạo mới người bán
export const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Grid hiển thị danh sách người bán
export const SellersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

// Header của SellerCard
export const SellerHeader = styled.div`
  background-color: #f6d9ab;
  height: 75px;
  border-radius: 8px 8px 0 0;
  position: relative;
`;

// Card người bán
export const SellerCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding-bottom: 20px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// Hình ảnh người dùng
export const SellerImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
`;

// Thông tin người bán
export const SellerInfo = styled.div`
  margin-top: 40px;
`;

// Tên người bán
export const SellerName = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

// ID người bán
export const SellerID = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
`;

// Email người bán
export const SellerEmail = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
`;

// Nút profile
export const ProfileButton = styled.button`
  padding: 8px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
