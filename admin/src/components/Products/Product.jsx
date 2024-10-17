import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../../redux/slices/productSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
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
  const { categories = [] } = useSelector((state) => state.categories) || {};
  const { products, totalPages, currentPage, loading, error } = useSelector(
    (state) => state.products
  );
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleClearEdit = () => {
    setEditProduct(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ProductContainer>
      <ProductHeader>
        <h2>Products</h2>
        <button onClick={() => setEditProduct(null)}>Create new</button>
      </ProductHeader>

      <SearchBar>
        <input type="text" placeholder="Search..." />
        <SelectGroup>
          <select>
            <option>All categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
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
          <ProductCard
            key={product._id}
            product={product}
            onEdit={handleEdit}
          /> // Sử dụng ProductCard component
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
