import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart"; // Import component ProductCart
import { fetchProduct } from "../../redux/slides/productSlice"; // Đường dẫn tới file productSlice.js
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Title,
  ProductListContainer,
  PaginationButton,
  Pagination,
  PaginationInfo,
} from "./styles";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProduct({ page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (products.length < productsPerPage) return;
    setCurrentPage(currentPage + 1);
  };

  if (loading) {
    console.log("Loading products...");
    return <p>Loading...</p>;
  }
  if (error) {
    console.log("Error loading products:", error);
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <Title>Product List</Title>
      <ProductListContainer>
        {products.map((product) => (
          <ProductCart key={product._id} productId={product._id} />
        ))}
      </ProductListContainer>
      <Pagination>
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        <PaginationInfo>Page {currentPage}</PaginationInfo>
        <PaginationButton
          onClick={handleNextPage}
          disabled={products.length < productsPerPage}
        >
          Next
        </PaginationButton>
      </Pagination>
    </Container>
  );
};
export default ProductList;
