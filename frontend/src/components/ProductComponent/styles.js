import styled from "styled-components";

// Container của toàn bộ card sản phẩm
export const ProductCardContainer = styled.div`
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

// Hình ảnh sản phẩm
export const ProductImage = styled.img`
  width: auto;
  height: 100%;
  object-fit: cover;
  object-fit: contain;
`;

// Container cho thông tin chi tiết sản phẩm
export const ProductDetails = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// Tên sản phẩm
export const ProductName = styled.h3`
  font-size: 1.2em;
  margin: 0 0 10px;
  color: #333;
`;

// Mô tả sản phẩm
export const ProductDescription = styled.p`
  font-size: 0.9em;
  color: #666;
  margin-bottom: 15px;
`;

// Giá sản phẩm
export const ProductPrice = styled.p`
  font-size: 1.1em;
  font-weight: bold;
  color: #e91e63;
  margin-bottom: 10px;
`;

// Số lượng trong kho
export const ProductStock = styled.p`
  font-size: 0.9em;
  color: ${(props) => (props.stock > 0 ? "#4caf50" : "#f44336")};
  margin-bottom: 15px;
`;

// Nút thêm sản phẩm vào giỏ hàng
export const AddToCartButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Container của toàn bộ trang chi tiết sản phẩm
export const ProductDetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  max-width: 1200px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;
// Hình ảnh sản phẩm lớn
export const ProductDetailImage = styled.img`
  width: 50%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 40px;
`;

// Container cho thông tin chi tiết sản phẩm
export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

// Mô tả sản phẩm
export const ProductDetailDescription = styled.p`
  font-size: 1.1em;
  line-height: 1.5;
  color: #666;
  margin-bottom: 20px;
`;

// Giá sản phẩm
export const ProductDetailPrice = styled.p`
  font-size: 1.8em;
  font-weight: bold;
  color: #e91e63;
  margin-bottom: 20px;
`;

// Số lượng trong kho
export const ProductDetailStock = styled.p`
  font-size: 1.2em;
  color: ${(props) => (props.stock > 0 ? "#4caf50" : "#f44336")};
  margin-bottom: 20px;
`;

// Nút thêm vào giỏ hàng
export const AddToCartDetailButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
