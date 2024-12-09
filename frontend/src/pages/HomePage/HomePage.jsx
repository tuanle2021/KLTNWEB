import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromoSlider from "../../components/Slide";
import {
  fetchFilterProduct,
  fetchProducts,
  setPage,
} from "../../redux/slices/productSlice";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import FlashSale from "../../components/QuickviewComponent/QuickView";
import ProductGrid from "./ProductGrid";
import ProductListSection from "./ProductListSection";
import CategorySection from "./CategorySection";
import Loading from "../../components/LoadingError/Loading";
import FeatureSection from "../../components/FeatureComponent/FeatrureSection";
import { TopBanner } from "./style";

const HomePage = () => {
  const dispatch = useDispatch();
  const gridRef = useRef();
  const [localProducts, setLocalProducts] = useState([]);
  const [localFeaturedProducts, setLocalFeaturedProducts] = useState([]);

  const {
    products,
    featuredProducts,
    loading,
    error,
    currentPage,
    productsPerPage,
    totalPages,
  } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchFilterProduct({ page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage, productsPerPage]);

  useEffect(() => {
    setLocalProducts(products);
    setLocalFeaturedProducts(featuredProducts);
  }, [products, featuredProducts]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  }, [dispatch, currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  }, [dispatch, currentPage, totalPages]);

  const memoizedProducts = useMemo(() => localProducts, [localProducts]);
  const memoizedFilterProducts = useMemo(
    () => localFeaturedProducts,
    [localFeaturedProducts]
  );

  return (
    <div>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <Roadmap />
      <div className="container">
        <TopBanner>
          <PromoSlider />
        </TopBanner>
        <CategorySection />

        <ProductListSection
          products={memoizedFilterProducts}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <ProductGrid ref={gridRef} products={memoizedProducts} />
        <FlashSale />
        <FeatureSection />
      </div>
    </div>
  );
};

export default HomePage;
