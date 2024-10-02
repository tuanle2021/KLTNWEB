import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Thêm import useDispatch từ react-redux
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromoSlider from "../../components/Slide";
import CategoryMenu from "../../components/Category";
import { TopBanner, ProductGrid } from "./style";
import ProductCart from "../../components/ProductComponent/ProductCart";
import { fetchProducts } from "../../redux/slides/productSlice";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
const HomePage = () => {
  const dispatch = useDispatch(); // Sử dụng useDispatch để dispatch các hành động
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
        <ProductGrid>
          {products.map((product) => (
            <ProductCart key={product._id} productId={product._id} />
          ))}
        </ProductGrid>
      </div>
    </div>
  );
};

export default HomePage;
