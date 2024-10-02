import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slides/productSlice";
import { FaHeart, FaEye } from "react-icons/fa";

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

const ProductCart = ({ productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.products.products.find((product) => product._id === productId)
  );

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, product]);

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };

  if (!product) return <p>Loading...</p>;

  const { id, name, price, originalPrice, images, rating, reviews } = product;
  const discount = 20;
  return (
    <ProductCardContainer onClick={handleCardClick}>
      {/* Nhãn giảm giá */}
      <DiscountBadge>{`-${discount}%`}</DiscountBadge>

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
          <span>${price}</span> <small>${originalPrice}</small>
        </ProductPrice>
        <ProductRating>
          <span>⭐</span> {rating} ({reviews})
        </ProductRating>
        <AddToCartButton
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Add To Cart
        </AddToCartButton>
      </ProductDetails>
    </ProductCardContainer>
  );
};

export default ProductCart;
