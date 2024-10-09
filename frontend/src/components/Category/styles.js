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

// export const CategoryList = styled.div`
//   max-height: 100%;
// `;

// export const CategoryItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   padding: 15px;
//   cursor: pointer;
//   border-bottom: 1px solid #eaeaea;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

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

export const Catalog = styled.div`
  cursor: pointer;
  padding: 13px;

  background-color: white;
  border: 1px solid #000;
`;
export const Overlay = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

export const MenuContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  background-color: white;
  z-index: 20;
  width: 1140px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

export const CategoryList = styled.div`
  width: 20%;
  padding: 10px;
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }

  & span {
    margin-right: 10px;
  }
`;

export const BrandContainer = styled.div`
  display: flex;
  width: 60%;
  padding: 10px;
`;

export const BrandItem = styled.div`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const BestSellingContainer = styled.div`
  width: 20%;
  padding: 10px;
  background-color: #f5f5f5;
`;

export const BestSellingItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  text-align: center;

  & img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-bottom: 5px;
  }

  & div {
    margin-bottom: 3px;
  }
`;
