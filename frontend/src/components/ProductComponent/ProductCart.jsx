import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slices/productSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { addToCart } from "../../redux/slices/cartSlice";

import {
  ProductCardContainer,
  ProductImage,
  Image,
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
  const Product = useSelector((state) =>
    state.products.products.find((Product) => Product._id === product)
  );
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(product));
    }
  }, [dispatch, product, Product]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

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
      <ProductImage>
        {/* Nhãn giảm giá */}
        <DiscountBadge>{`-${discount}%`}</DiscountBadge>

        {/* Các icon hành động (Yêu thích và Xem chi tiết) */}
        <ProductActionIcons>
          <ActionIcon onClick={handleFavoriteClick}>
            {isFavorited ? <FaHeart /> : <FaRegHeart />}
          </ActionIcon>
        </ProductActionIcons>

        {/* Hình ảnh sản phẩm */}
        <Image
          src={
            images && images.length > 0
              ? images[0]
              : `https://via.placeholder.com/150?text=${name}`
          }
          alt={name}
        />
        <AddToCartButton onClick={handleAddToCart}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FiShoppingCart size={16} />
            <p style={{ marginLeft: "8px" }}> Add To Cart</p>
          </div>
        </AddToCartButton>
      </ProductImage>

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
      </ProductDetails>
    </ProductCardContainer>
  );
};

export default ProductCart;
