import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import {
  ProductContainer,
  ProductGrid,
  SearchBar,
  SelectGroup,
  Pagination,
  ProductHeader,
} from "./styles";

const fakeProducts = [
  {
    _id: "1",
    name: "Product 1",
    category: "Electronics",
    price: 100,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    _id: "2",
    name: "Product 2",
    category: "Clothings",
    price: 50,
    countInStock: 20,
    rating: 4.0,
    numReviews: 8,
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    _id: "3",
    name: "Product 1",
    category: "Electronics",
    price: 100,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    _id: "4",
    name: "Product 1",
    category: "Electronics",
    price: 100,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    _id: "5",
    name: "Product 1",
    category: "Electronics",
    price: 100,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    _id: "6",
    name: "Product 1",
    category: "Electronics",
    price: 100,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
  {
    _id: "7",
    name: "Product 1",
    category: "Electronics",
    price: 100,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    image:
      "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg",
  },
];

const MainProducts = () => {
  const [products, setProducts] = useState(fakeProducts);

  useEffect(() => {
    setProducts(fakeProducts);
  }, []);

  return (
    <ProductContainer>
      <ProductHeader>
        <h2>Products</h2>
        <button>Create new</button>
      </ProductHeader>

      <SearchBar>
        <input type="text" placeholder="Search..." />
        <SelectGroup>
          <select>
            <option>All categories</option>
            <option>All categories</option>
            <option>All categories</option>
            <option>All categories</option>
          </select>
          <select>
            <option>Latest added</option>
            <option>Latest added</option>
            <option>Latest added</option>
            <option>Latest added</option>
          </select>
        </SelectGroup>
      </SearchBar>

      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} /> // Sử dụng ProductCard component
        ))}
      </ProductGrid>

      <Pagination>
        <button>Previous</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>Next</button>
      </Pagination>
    </ProductContainer>
  );
};

export default MainProducts;
