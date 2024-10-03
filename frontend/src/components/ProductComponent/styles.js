import styled from "styled-components";

// Container của toàn bộ card sản phẩm
export const ProductCardContainer = styled.div`
  width: 220px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  background: #fff;
  position: relative;
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

// Hình ảnh sản phẩm
export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
`;

// Nhãn giảm giá
export const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff0000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
`;

// Các icon hành động (Yêu thích và Xem chi tiết)
export const ProductActionIcons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

export const ActionIcon = styled.div`
  background: #fff;
  padding: 5px;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  svg {
    color: #ff0000;
    font-size: 1.2em;
  }

  &:hover {
    background: #ff0000;

    svg {
      color: #fff;
    }
  }
`;

// Container cho thông tin chi tiết sản phẩm
export const ProductDetails = styled.div`
  margin-top: 10px;
`;

// Tên sản phẩm
export const ProductName = styled.h3`
  font-size: 1.2em;
  margin: 10px 0;
  color: #333;
`;

// Giá sản phẩm
export const ProductPrice = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;

  span {
    font-size: 1.5em;
    color: #ff0000;
  }

  small {
    font-size: 1em;
    text-decoration: line-through;
    color: #aaa;
  }
`;

// Nút thêm sản phẩm vào giỏ hàng
export const AddToCartButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ff0000;
  }
`;

// Đánh giá sản phẩm
export const ProductRating = styled.div`
  margin-top: 10px;
  font-size: 0.9em;
  color: #666;

  span {
    color: #ffa500; // Màu vàng cho các ngôi sao
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
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
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

// Container cho hình ảnh nhỏ
export const ThumbnailContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

// Hình ảnh nhỏ
export const ThumbnailImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: ${(props) =>
    props.isActive ? "2px solid #007bff" : "2px solid transparent"};
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  transition: border 0.3s ease;

  &:hover {
    border: 2px solid #007bff;
  }
`;

// Nút mũi tên
export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
// Styled Components
export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
