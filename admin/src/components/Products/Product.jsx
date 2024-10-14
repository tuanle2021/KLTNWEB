import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../../redux/slices/productSlice";
import ProductCard from "./ProductCard";
import {
  ProductContainer,
  ProductGrid,
  SearchBar,
  SelectGroup,
  Pagination,
  ProductHeader,
} from "./styles";

const MainProducts = () => {
  const dispatch = useDispatch();
  const { products, totalPages, currentPage, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={currentPage === page + 1 ? "active" : ""}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </Pagination>
    </ProductContainer>
  );
};

export default MainProducts;
