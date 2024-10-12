import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PhoneOutlined,
  DesktopOutlined,
  CameraOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import { FiWatch } from "react-icons/fi";
import { LuGamepad } from "react-icons/lu";
import { CategoryContainer, Header, CategoryList, CategoryCard } from "./style";

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <CategoryContainer>
      <Header>
        <div>
          <h3>Category</h3>
          <h1>Brower By Category</h1>
        </div>
      </Header>
      <CategoryList>
        <CategoryCard onClick={() => handleCategoryClick("Phones")}>
          <PhoneOutlined />
          <span>Phones</span>
        </CategoryCard>
        <CategoryCard onClick={() => handleCategoryClick("Desktops")}>
          <DesktopOutlined />
          <span>Desktops</span>
        </CategoryCard>
        <CategoryCard onClick={() => handleCategoryClick("Watches")}>
          <FiWatch />
          <span>Watches</span>
        </CategoryCard>
        <CategoryCard onClick={() => handleCategoryClick("Cameras")}>
          <CameraOutlined />
          <span>Cameras</span>
        </CategoryCard>
        <CategoryCard onClick={() => handleCategoryClick("Audio")}>
          <AudioOutlined />
          <span>Audio</span>
        </CategoryCard>
        <CategoryCard onClick={() => handleCategoryClick("Gamepads")}>
          <LuGamepad />
          <span>Gamepads</span>
        </CategoryCard>
      </CategoryList>
    </CategoryContainer>
  );
};

export default React.memo(CategorySection);
