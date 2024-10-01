import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slides/productSlice";

import {
  ProductCardContainer,
  ProductImage,
  ProductDetails,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductStock,
  AddToCartButton,
} from "./styles";

const ProductCart = ({ productId }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const product = useSelector((state) =>
    state.products.products.find((product) => product._id === productId)
  );

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, product]);

  const handleCardClick = () => {
    history.push(`/product/${productId}`);
  };

  if (!product) return <p>Loading...</p>;

  const { name, description, price, stock, images } = product;
  return (
    <ProductCardContainer onClick={handleCardClick}>
      {/* Hiển thị hình ảnh sản phẩm (Sử dụng hình ảnh đầu tiên nếu có) */}
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
        <ProductDescription>{description}</ProductDescription>
        <ProductPrice>{`$${price}`}</ProductPrice>
        <ProductStock>{`Stock: ${
          stock > 0 ? stock : "Out of stock"
        }`}</ProductStock>
        <AddToCartButton
          onClick={(e) => {
            e.stopPropagation();
          }}
          disabled={stock <= 0}
        >
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </AddToCartButton>
      </ProductDetails>
    </ProductCardContainer>
  );
};

export default ProductCart;
