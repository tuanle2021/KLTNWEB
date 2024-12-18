import styled from "styled-components";

// Container
export const ChatbotContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
  height: 700px;
  width: 550px;
  margin: 0 auto;
  background-color: gray;
`;
export const BotContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 400px;
  margin-top: 10px;
  margin-left: 10px;

  background-color: white;
`;
export const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 400px;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: auto;

  background-color: Blue;
`;
export const MessageChatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 10px;
  margin-right: 10px;
  margin-left: auto;

`;
export const MessageUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 10px;
  text-align: right;

`;
export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 550px;
  position: absolute;
  bottom: 90px;
  padding: 10px;

`;
export const MessageInputContainer = styled.input`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 10px;
  margin-left: auto;

`;

export const PushButton = styled.button`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 70px;
  padding: 5px;
  background-color: #4CAF50;
  align-items: center;

`;


// Container cho từng mục trong giỏ hàng
export const CartItemContainer = styled.div`
  display: grid;
  padding-left: 30px;
  grid-template-columns: 2fr 1fr 1fr 1fr 50px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  cursor: pointer;
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

// Nút để lưu số lượng sản phẩm
export const SaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  right: -60px; // Đặt vị trí bên cạnh trường số lượng
  top: 50%;
  transform: translateY(-50%);
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
  width: 20em;
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



// Chi tiết từng dòng tổng giá trị giỏ hàng
export const CartTotalDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-of-type {
    border-bottom: none; // Không có đường viền ở phần cuối
    font-weight: bold;
  }

  & > span {
    font-size: 1rem;
    color: #555;
  }
`;

// Nút tiến hành thanh toán
export const ProceedToCheckoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 15px 30px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b; // Màu đậm hơn khi hover
  }
`;

export const SelectItemCheckbox = styled.input`
  position: absolute;
  left: -2%;
  top: 50%;
  transform: translateY(-50%);
`;
