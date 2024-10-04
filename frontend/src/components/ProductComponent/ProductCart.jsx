import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slides/cartSlice";
import {
  ProductCardContainer,
  ProductImage,
  DiscountBadge,
  ProductActionIcons,
  ProductDetails,
  ProductName,
  ProductPrice,
  AddToCartButton,
  ProductRating,
  ActionIcon,
} from "./styles";

const ProductCart = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Nếu không có sản phẩm được truyền vào, hiển thị "Loading..."
  if (!product) return <p>Loading...</p>;

  // Destructure các thuộc tính của sản phẩm để sử dụng dễ dàng hơn
  const { _id, name, price, originalPrice, images, rating, reviews } = product;

  // Tính toán giảm giá nếu có giá gốc (originalPrice)
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Điều hướng đến trang chi tiết sản phẩm khi click vào card
  const handleCardClick = () => {
    navigate(`/product/${_id}`);
  };
  // Xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn chặn việc click chuyển hướng trang khi click vào nút
    dispatch(addToCart({ productId: _id, quantity: 1 }));
  };
  return (
    <ProductCardContainer onClick={handleCardClick}>
      {/* Nhãn giảm giá nếu có giảm giá */}
      {discount > 0 && <DiscountBadge>{`-${discount}%`}</DiscountBadge>}

      {/* Các icon hành động (Yêu thích và Xem chi tiết) */}
      <ProductActionIcons>
        <ActionIcon>
          <FaHeart />
        </ActionIcon>
        <ActionIcon>
          <FaEye />
        </ActionIcon>
      </ProductActionIcons>

      {/* Hình ảnh sản phẩm */}
      <ProductImage
        src={
          images && images.length > 0
            ? images[0]
            : `https://via.placeholder.com/150?text=${name}`
        }
        alt={name}
      />

      {/* Thông tin chi tiết sản phẩm */}
      <ProductDetails>
        <ProductName>{name}</ProductName>
        <ProductPrice>
          <span>${price}</span>{" "}
          {originalPrice && <small>${originalPrice}</small>}
        </ProductPrice>
        <ProductRating>
          <span>⭐</span> {rating} ({reviews})
        </ProductRating>
        <AddToCartButton onClick={handleAddToCart}>Add To Cart</AddToCartButton>
      </ProductDetails>
    </ProductCardContainer>
  );
};

export default ProductCart;
