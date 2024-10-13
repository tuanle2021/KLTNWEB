import styled from "styled-components";

export const OrderContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 97%;
  margin: auto;
`;

// Thanh tìm kiếm và lựa chọn
export const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 300px;
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
  }
`;
