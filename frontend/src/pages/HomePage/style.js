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
