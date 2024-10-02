import styled from "styled-components";

// Container cho toàn bộ giỏ hàng
export const CartContainer = styled.div`
  width: 80%;
  margin: 50px auto;
`;

// Phần tiêu đề của giỏ hàng
export const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 50px;
  text-align: left;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 2px solid #eee;
`;

// Container cho từng mục trong giỏ hàng
export const CartItemContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 50px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
`;

// Hình ảnh sản phẩm
export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

// Tên sản phẩm
export const ProductName = styled.span`
  font-size: 1em;
  font-weight: 500;
`;

// Giá sản phẩm
export const ProductPrice = styled.span`
  font-size: 1em;
  font-weight: bold;
  color: #e91e63;
`;

// Số lượng sản phẩm
export const ProductQuantity = styled.input`
  width: 50px;
  padding: 5px;
  font-size: 1em;
  text-align: center;
`;

// Tổng giá cho mỗi sản phẩm
export const ProductSubtotal = styled.span`
  font-size: 1em;
`;

// Nút để xóa sản phẩm khỏi giỏ hàng
export const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #f44336;
  position: absolute;
  top: 0;
  left: -15px;
`;

// Các hành động cho giỏ hàng như mã coupon, cập nhật giỏ hàng
export const CartActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

// Nút quay lại shop
export const ReturnToShopButton = styled.button`
  background: none;
  border: 1px solid #333;
  padding: 10px 20px;
  cursor: pointer;
`;

// Input mã coupon
export const CouponInput = styled.input`
  padding: 10px;
  border: 1px solid #e0e0e0;
  margin-right: 10px;
`;

// Nút áp dụng mã coupon
export const ApplyCouponButton = styled.button`
  background-color: #e91e63;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

// Nút cập nhật giỏ hàng
export const UpdateCartButton = styled.button`
  background: none;
  border: 1px solid #333;
  padding: 10px 20px;
  cursor: pointer;
`;

// Container cho phần mã coupon và tổng giá trị giỏ hàng
export const CouponAndTotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

// Container tính toán tổng giá trị giỏ hàng
export const CartTotalContainer = styled.div`
  padding: 20px;
  border: 1px solid #333;
  width: 300px;
  align-self: flex-end;

  & > h3 {
    margin-bottom: 20px;
  }
`;

// Nút tiến hành thanh toán
export const ProceedToCheckoutButton = styled.button`
  background-color: #e91e63;
  color: white;
  border: none;
  padding: 15px 30px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  font-weight: bold;
`;
