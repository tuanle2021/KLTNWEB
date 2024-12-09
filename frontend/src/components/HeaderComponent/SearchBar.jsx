import React, { useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import {
  SearchContainer,
  SearchInput,
  SearchButton,
  SearchResults,
  SearchResultItem,
  ProductImage,
  ProductName,
} from "./styles";

// Dữ liệu tĩnh giả
const staticProducts = [
  {
    _id: "1",
    name: "mot",
    images: [
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727691871/products/iphone-13_2_.webp.webp",
    ],
  },
  {
    _id: "2",
    name: "hai 2",
    images: [
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727691871/products/iphone-13_2_.webp.webp",
    ],
  },
  {
    _id: "3",
    name: "hai 3",
    images: [
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727691871/products/iphone-13_2_.webp.webp",
    ],
  },
  {
    _id: "4",
    name: "ba 4",
    images: [
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727691871/products/iphone-13_2_.webp.webp",
    ],
  },
];

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const typingTimeoutRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const results = staticProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchedProducts(results);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = staticProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedProducts(results);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Search for tech products..."
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SearchButton type="submit">
          <IoSearch />
        </SearchButton>
      </form>
      {isFocused && searchedProducts.length > 0 && (
        <SearchResults>
          {searchedProducts.map((product) => (
            <SearchResultItem key={product._id}>
              <ProductImage src={product.images[0]} alt={product.name} />
              <ProductName>{product.name}</ProductName>
            </SearchResultItem>
          ))}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
