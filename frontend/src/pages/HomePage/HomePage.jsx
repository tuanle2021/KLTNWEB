import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; // Thêm import useDispatch từ react-redux
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromoSlider from "../../components/Slide";
import CategoryMenu from "../../components/Category";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiWatch } from "react-icons/fi";
import { LuGamepad } from "react-icons/lu";
import { fetchFilterProduct, setPage } from "../../redux/slices/productSlice";
import {
  PhoneOutlined,
  DesktopOutlined,
  CameraOutlined,
  AudioOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import ProductCart from "../../components/ProductComponent/ProductCart";
import { fetchProducts } from "../../redux/slices/productSlice";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import FlashSale from "../../components/QuickviewComponent/QuickView";
import ProductList from "../../components/ProductComponent/ProductList";

import {
  TopBanner,
  ProductGrid,
  ArrowButton,
  LeftArrowButton,
  RightArrowButton,
  ProductLists,
  ProductListContainer,
  Pagination,
  PaginationButton,
  PaginationInfo,
  Header,
  Countdown,
  CountdownItem,
  Line,
  CategoryCard,
  CategoryContainer,
  CategoryList,
} from "./style";

const HomePage = () => {
  const dispatch = useDispatch(); // Sử dụng useDispatch để dispatch các hành động
  // const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const gridRef = useRef();

  const scrollLeft = () => {
    gridRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    gridRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

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
  }, [dispatch, currentPage]);

  // Chuyển trang trước
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  // Chuyển trang sau
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };
  if (loading) return console.log("Loading products...");
  if (error) return console.log("Error loading products:", error);

  return (
    <div>
      {/* Roadmap hiển thị đường dẫn */}
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
              <ArrowButton>
                <LeftArrowButton onClick={scrollLeft}>
                  <FaArrowLeft />
                </LeftArrowButton>
                <RightArrowButton onClick={scrollRight}>
                  <FaArrowRight />
                </RightArrowButton>
              </ArrowButton>
            </Countdown>
          </Header>
          <ProductGrid ref={gridRef}>
            {products.map((product) => (
              <ProductCart key={product._id} product={product} />
            ))}
          </ProductGrid>
        </div>
        <Line />
        <ProductLists>
          <Header>
            <div>
              <h3>Category</h3>
              <h1>Brower By Category</h1>
            </div>
          </Header>
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
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationButton>
          </Pagination>
        </ProductLists>
        <FlashSale />

        <CategoryContainer>
          <Header>
            <div>
              <h3>Category</h3>
              <h1>Brower By Category</h1>
            </div>
          </Header>

          <CategoryList>
            <CategoryCard>
              <PhoneOutlined />
              <span>Phones</span>
            </CategoryCard>
            <CategoryCard>
              <DesktopOutlined />
              <span>Phones</span>
            </CategoryCard>
            <CategoryCard>
              <FiWatch />
              <span>Phones</span>
            </CategoryCard>
            <CategoryCard>
              <CameraOutlined />
              <span>Phones</span>
            </CategoryCard>
            <CategoryCard>
              <AudioOutlined />
              <span>Phones</span>
            </CategoryCard>
            <CategoryCard>
              <LuGamepad />
              <span>Phones</span>
            </CategoryCard>
          </CategoryList>
        </CategoryContainer>
      </div>
    </div>
  );
};

export default HomePage;
