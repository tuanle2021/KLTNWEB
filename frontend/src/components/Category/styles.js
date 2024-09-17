import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #eaeaea;
  background-color: #f9f9f9;
`;

export const CategoryList = styled.div`
  max-height: 100%;
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #eaeaea;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const IconWrapper = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

export const ExpandIcon = styled.span`
  font-size: 16px;
`;

export const CategoryName = styled.span`
  font-size: 16px;
  font-weight: 500;
  flex-grow: 1;
  text-align: left;
`;
