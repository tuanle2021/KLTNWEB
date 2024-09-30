import React from "react";
import Slider from "react-slick";
import {
  PromoContainer,
  PromoContent,
  PromoText,
  PromoTitle,
  PromoButton,
} from "./styles";

// Array of promo slides with image, title, and description
const promoSlides = [
  {
    image: "https://example.com/promo1.jpg",
    title: "Giảm giá 20% cho tất cả các sản phẩm",
    description: "Chỉ trong tuần này! Nhanh tay đặt hàng.",
    link: "/promotions",
  },
  {
    image: "https://example.com/promo2.jpg",
    title: "Mua 1 tặng 1 - Sản phẩm công nghệ",
    description: "Khuyến mãi có hạn cho các sản phẩm công nghệ hàng đầu.",
    link: "/tech-deals",
  },
  {
    image: "https://example.com/promo3.jpg",
    title: "Giảm giá cuối mùa",
    description: "Sản phẩm giảm giá đến 50%.",
    link: "/clearance-sale",
  },
];

const PromoSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3800,
    arrows: false,
  };

  return (
    <PromoContainer>
      <Slider {...settings}>
        {promoSlides.map((slide, index) => (
          <div key={index}>
            <PromoContent>
              <PromoText>
                <PromoTitle>{slide.title}</PromoTitle>
                <p>{slide.description}</p>
                <PromoButton href={slide.link}>Xem khuyến mãi</PromoButton>
              </PromoText>
            </PromoContent>
          </div>
        ))}
      </Slider>
    </PromoContainer>
  );
};

export default PromoSlider;
