import React from "react";
import {
  ProductDetailContainer,
  ProductDetailImage,
  ProductInfo,
  ProductName,
  ProductDetailDescription,
  ProductDetailPrice,
  ProductDetailStock,
  AddToCartDetailButton,
} from "./styles";

const ProductDetail = ({ product }) => {
  const { id, name, description, price, stock, category_id } = product;

  return (
    <ProductDetailContainer>
      {/* Hiển thị hình ảnh lớn của sản phẩm */}
      <ProductDetailImage
        src={`  https://via.placeholder.com/500?text=${name}`}
        alt={name}
      />

      {/* Hiển thị thông tin chi tiết sản phẩm */}
      <ProductInfo>
        <ProductName>{name}</ProductName>
        <ProductDetailDescription>{description}</ProductDetailDescription>
        <ProductDetailPrice>{`$${price}`}</ProductDetailPrice>
        <ProductDetailStock>
          {stock > 0 ? `Stock available: ${stock}` : "Out of Stock"}
        </ProductDetailStock>
        <AddToCartDetailButton disabled={stock <= 0}>
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </AddToCartDetailButton>
      </ProductInfo>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
