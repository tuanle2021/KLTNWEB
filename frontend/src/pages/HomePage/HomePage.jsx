import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromoSlider from "../../components/Slide";
import CategoryMenu from "../../components/Category";
import { fetchFilterProduct, setPage } from "../../redux/slices/productSlice";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import FlashSale from "../../components/QuickviewComponent/QuickView";
import ArrowButtons from "./ArrowButtons";
import ProductGrid from "./ProductGrid";
import ProductListSection from "./ProductListSection";
import CategorySection from "./CategorySection";
import {
  TopBanner,
  Header,
  Countdown,
  CountdownItem,
  Line,
  Pagination,
  PaginationButton,
  PaginationInfo,
} from "./style";

const HomePage = () => {
  const dispatch = useDispatch();
  const gridRef = useRef();

  const scrollLeft = useCallback(() => {
    gridRef.current.scrollBy({ left: -300, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    gridRef.current.scrollBy({ left: 300, behavior: "smooth" });
  }, []);

  const {
    products,
    loading,
    error,
    currentPage,
    totalProducts,
    productsPerPage,
    totalPages,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFilterProduct({ page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage, productsPerPage]);

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

  const memoizedProducts = useMemo(() => products, [products]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div>
      <Roadmap />
      <div className="container">
        <TopBanner>
          <CategoryMenu />
          <PromoSlider />
        </TopBanner>

        <div style={{ position: "relative", marginTop: "40px" }}>
          <Header>
            <div>
              <h3>Today's</h3>
              <h1>Quick View</h1>
            </div>
            <Countdown>
              <CountdownItem>
                <span>03</span>
                <small>Days</small>
              </CountdownItem>
              <CountdownItem>
                <span>23</span>
                <small>Hours</small>
              </CountdownItem>
              <CountdownItem>
                <span>19</span>
                <small>Minutes</small>
              </CountdownItem>
              <CountdownItem>
                <span>56</span>
                <small>Seconds</small>
              </CountdownItem>
              <ArrowButtons scrollLeft={scrollLeft} scrollRight={scrollRight} />
            </Countdown>
          </Header>
          <ProductGrid ref={gridRef} products={memoizedProducts} />
        </div>
        <ProductListSection
          products={memoizedProducts}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <FlashSale />
        <CategorySection />
      </div>
    </div>
  );
};

export default HomePage;
