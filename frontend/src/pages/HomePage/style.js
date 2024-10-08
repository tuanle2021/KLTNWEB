import styled from "styled-components";

export const TopBanner = styled.div`
  display: flex;
`;

export const ProductGrid = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    flex: 0 0 auto;
  }
`;
// Nút điều hướng trái
export const LeftArrowButton = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background-color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: #e0e0e0;
  }

  svg {
    font-size: 1.2em;
  }
`;

// Nút điều hướng phải
export const RightArrowButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: #e0e0e0;
  }

  svg {
    font-size: 1.2em;
  }
`;
export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    background-color: #ff0000;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const PaginationInfo = styled.span`
  font-size: 1.2em;
`;
