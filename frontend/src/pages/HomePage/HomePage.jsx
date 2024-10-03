import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; // Thêm import useDispatch từ react-redux
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromoSlider from "../../components/Slide";
import CategoryMenu from "../../components/Category";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import ProductCart from "../../components/ProductComponent/ProductCart";
import { fetchProducts } from "../../redux/slides/productSlice";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import FlashSale from "../../components/QuickviewComponent/QuickView";
import ProductList from "../../components/ProductComponent/ProductList";

import {
  TopBanner,
  ProductGrid,
  LeftArrowButton,
  RightArrowButton,
} from "./style";
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
  if (loading) return console.log("Loading products...");
  if (error) return console.log("Error loading products:", error);

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
              <ProductCart key={product._id} product={product} />
            ))}
          </ProductGrid>
          <RightArrowButton onClick={scrollRight}>
            <FaArrowRight />
          </RightArrowButton>
        </div>

        <ProductList />
        <FlashSale />
      </div>
    </div>
  );
};

export default HomePage;
