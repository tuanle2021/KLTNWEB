import React, { useState } from "react";
import {
  Container,
  CategoryHeader,
  CategoryItem,
  CategoryList,
  IconWrapper,
  ExpandIcon,
  CategoryName,
} from "./styles";

const categories = [
  { name: "Computers", icon: "💻" },
  { name: "Smartphones", icon: "📱" },
  { name: "Gadgets", icon: "⌚" },
  { name: "Software", icon: "💽" },
  { name: "Internet", icon: "🌐" },
  { name: "Electronics", icon: "🔌" },
  { name: "Accessories", icon: "🎧" },
  { name: "Networking", icon: "📡" },
  { name: "Security", icon: "🔒" },
  { name: "AI & Machine Learning", icon: "🤖" },
  { name: "Virtual Reality", icon: "👓" },
];

const CategoryMenu = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container>
      <CategoryHeader onClick={toggleExpand}>
        <IconWrapper>📂</IconWrapper>
        <CategoryName>All Categories</CategoryName>
        <ExpandIcon>{!isExpanded ? "⬆️" : "⬇️"}</ExpandIcon>
      </CategoryHeader>

      {!isExpanded && (
        <CategoryList>
          {categories.map((category, index) => (
            <CategoryItem key={index}>
              <IconWrapper>{category.icon}</IconWrapper>
              <CategoryName>{category.name}</CategoryName>
              <ExpandIcon>➡️</ExpandIcon>
            </CategoryItem>
          ))}
        </CategoryList>
      )}
    </Container>
  );
};

export default CategoryMenu;
