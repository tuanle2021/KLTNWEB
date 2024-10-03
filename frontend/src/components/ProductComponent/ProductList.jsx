import React, { useEffect } from "react";
import ProductCart from "./ProductCart";
import { fetchFilterProduct, setPage } from "../../redux/slides/productSlice";
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
  const {
    products,
    loading,
    error,
    currentPage,
    totalProducts,
    productsPerPage,
  } = useSelector((state) => state.products);
  // Chỉ gọi API khi `currentPage` hoặc `productsPerPage` thay đổi.
  // Thêm kiểm tra nếu `products` chưa có dữ liệu, tránh gọi API liên tục.
  useEffect(() => {
    if (products.length === 0) {
      dispatch(
        fetchFilterProduct({ page: currentPage, limit: productsPerPage })
      );
    }
  }, [dispatch, currentPage, productsPerPage]);

  // Chuyển trang trước
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  // Chuyển trang sau
  const handleNextPage = () => {
    if (currentPage * productsPerPage < totalProducts) {
      dispatch(setPage(currentPage + 1));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log("Error loading products:", error);
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(products)) {
    console.error("Products is not an array:", products);
    return <p>Error: Products data is invalid</p>;
  }

  return (
    <Container>
      <Title>Product List</Title>
      <ProductListContainer>
        {products.map((product) => (
          <ProductCart key={product._id} product={product} />
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
          disabled={currentPage * productsPerPage >= totalProducts}
        >
          Next
        </PaginationButton>
      </Pagination>
    </Container>
  );
};

export default ProductList;
