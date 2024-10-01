import React, { useState } from "react";
import {
  Box,
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
];

const CategoryMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box>
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
    </Box>
  );
};

export default CategoryMenu;
