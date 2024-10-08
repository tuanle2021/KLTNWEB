import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slides/productSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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

const ProductCart = ({ productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.products.products.find((product) => product._id === productId)
  );
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, product]);

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };
  if (!product) return <p>Loading...</p>;

  const { id, name, price, originalPrice, images, rating, reviews } = product;
  const discount = 20;
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
        <AddToCartButton
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Add To Cart
        </AddToCartButton>
      </ProductImage>

      {/* Thông tin chi tiết sản phẩm */}
      <ProductDetails>
        <ProductName>{name}</ProductName>
        <ProductPrice>
          <span>${price}</span> <small>${originalPrice}</small>
        </ProductPrice>
        <ProductRating>
          <span>⭐</span> {rating} ({reviews})
        </ProductRating>
      </ProductDetails>
    </ProductCardContainer>
  );
};

export default ProductCart;
