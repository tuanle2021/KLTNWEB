import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromoSlider from "../../components/Slide";
import CategoryMenu from "../../components/Category";
const HomePage = () => {
  return (
    <div>
      <CategoryMenu />
      <PromoSlider />
      HomePage
    </div>
  );
};

export default HomePage;
