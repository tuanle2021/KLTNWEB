import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchFilterProduct, setPage } from "../../redux/slices/productSlice";
import CategorySection from "../HomePage/CategorySection";
import ProductListSection from "../HomePage/ProductListSection";
import FilterSidebar from "../../components/Category/index";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductPage = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const category = query.get("category");

  const { products, currentPage, totalPages } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (category) {
      dispatch(fetchFilterProduct({ category, page: currentPage }));
    }
  }, [dispatch, category, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  return (
    <div className="container">
      <CategorySection />
      <FilterSidebar />
      <ProductListSection
        products={products}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ProductPage;
