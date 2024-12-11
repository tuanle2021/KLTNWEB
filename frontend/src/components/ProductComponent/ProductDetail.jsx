import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  openCartSidebar,
  getCart,
} from "../../redux/slices/cartSlice";
import CartSidebar from "../../pages/CartPage/CartSidebar";
import {
  ProductDetailContainer,
  ProductDetailImage,
  ProductInfo,
  ProductName,
  ProductDetailDescription,
  ProductDetailPrice,
  ProductDetailStock,
  AddToCartDetailButton,
  ThumbnailContainer,
  ThumbnailImage,
  ArrowButton,
} from "./styles";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { name, description, price, stock, images } = product;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cartLoading = useSelector((state) => state.cart.fulfilled);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (cartItems.length === 0 && !cartLoading) {
      dispatch(getCart());
    }
  }, [dispatch, cartItems.length, cartLoading]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (user) {
      await dispatch(addToCart({ productId: id, quantity: 1 }));
      await dispatch(getCart()); // Load lại giỏ hàng sau khi thêm sản phẩm
      dispatch(openCartSidebar()); // Mở sidebar
    } else {
      alert("Please login to add to cart");
      navigate("/login");
    }
  };

  return (
    <ProductDetailContainer>
      {/* Hiển thị hình ảnh lớn của sản phẩm */}
      <div style={{ position: "relative" }}>
        <ProductDetailImage src={images[currentImageIndex]} alt={name} />
        <ArrowButton onClick={handlePrevImage} style={{ left: 0 }}>
          &lt;
        </ArrowButton>
        <ArrowButton onClick={handleNextImage} style={{ right: 0 }}>
          &gt;
        </ArrowButton>
      </div>

      {/* Hiển thị thông tin chi tiết sản phẩm */}
      <ProductInfo>
        <ProductName>{name}</ProductName>
        <ProductDetailDescription>{description}</ProductDetailDescription>
        <ProductDetailPrice>{`$${price}`}</ProductDetailPrice>
        <ProductDetailStock>
          {stock > 0 ? `Stock available: ${stock}` : "Out of Stock"}
        </ProductDetailStock>
        <AddToCartDetailButton disabled={stock <= 0} onClick={handleAddToCart}>
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </AddToCartDetailButton>
        <ThumbnailContainer>
          {images.map((image, index) => (
            <ThumbnailImage
              key={index}
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              onClick={() => setCurrentImageIndex(index)}
              isActive={index === currentImageIndex}
            />
          ))}
        </ThumbnailContainer>
      </ProductInfo>
      <CartSidebar />
    </ProductDetailContainer>
  );
};

export default ProductDetail;
