import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; // Thêm import useDispatch từ react-redux
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromoSlider from "../../components/Slide";
import CategoryMenu from "../../components/Category";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import {
  TopBanner,
  ProductGrid,
  ProductCardContainer,
  LeftArrowButton,
  RightArrowButton,
} from "./style";
import ProductCart from "../../components/ProductComponent/ProductCart";
import { fetchProducts } from "../../redux/slides/productSlice";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import FlashSale from "../../components/QuickviewComponent/QuickView";
const HomePage = () => {
  const dispatch = useDispatch(); // Sử dụng useDispatch để dispatch các hành động
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const gridRef = useRef();

  const scrollLeft = () => {
    gridRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    gridRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Roadmap hiển thị đường dẫn */}
      <Roadmap />
      <div className="container">
        <TopBanner>
          <CategoryMenu />
          <PromoSlider />
        </TopBanner>
        <div style={{ position: "relative" }}>
          <LeftArrowButton onClick={scrollLeft}>
            <FaArrowLeft />
          </LeftArrowButton>
          <ProductGrid ref={gridRef}>
            {products.map((product) => (
              <ProductCart key={product._id} productId={product._id} />
            ))}
          </ProductGrid>
          <RightArrowButton onClick={scrollRight}>
            <FaArrowRight />
          </RightArrowButton>
        </div>
        <FlashSale></FlashSale>
      </div>
    </div>
  );
};

export default HomePage;
