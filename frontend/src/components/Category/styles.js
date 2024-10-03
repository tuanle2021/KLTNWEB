import styled from "styled-components";

export const Box = styled.div`
  width: 28%;
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
  background-color: ${(props) => (props.isExpanded ? "#e0e0e0" : "#f9f9f9")};
  transition: background-color 0.3s ease;
`;

export const CategoryList = styled.div`
  max-height: 100%;
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
