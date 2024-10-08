import React from "react";
import {
  PhoneOutlined,
  DesktopOutlined,
  CameraOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import { FiWatch } from "react-icons/fi";
import { LuGamepad } from "react-icons/lu";
import { CategoryContainer, Header, CategoryList, CategoryCard } from "./style";

const CategorySection = () => (
  <CategoryContainer>
    <Header>
      <div>
        <h3>Category</h3>
        <h1>Brower By Category</h1>
      </div>
    </Header>
    <CategoryList>
      <CategoryCard>
        <PhoneOutlined />
        <span>Phones</span>
      </CategoryCard>
      <CategoryCard>
        <DesktopOutlined />
        <span>Phones</span>
      </CategoryCard>
      <CategoryCard>
        <FiWatch />
        <span>Phones</span>
      </CategoryCard>
      <CategoryCard>
        <CameraOutlined />
        <span>Phones</span>
      </CategoryCard>
      <CategoryCard>
        <AudioOutlined />
        <span>Phones</span>
      </CategoryCard>
      <CategoryCard>
        <LuGamepad />
        <span>Phones</span>
      </CategoryCard>
    </CategoryList>
  </CategoryContainer>
);

export default React.memo(CategorySection);
