import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromoSlider from "../../components/Slide";
import CategoryMenu from "../../components/Category";
import { TopBanner } from "./style";
const HomePage = () => {
  return (
    <div className="container">
      <TopBanner>
        <CategoryMenu />
        <PromoSlider />
      </TopBanner>
      HomePage
    </div>
  );
};

export default HomePage;
