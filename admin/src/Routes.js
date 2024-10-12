import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesScreen from "./pages/CategoriesScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import ProductScreen from "./pages/productScreen";
import LoginPage from "./pages/LoginScreen";
import AddProduct from "./pages/AddProduct";
import UsersScreen from "./pages/UsersScreen";
import Sidebar from "./components/SideBar";
import Header from "./components/Header";
import { ContentWrapper } from "./components/styles";
import OrderScreen from "./pages/OrderScreen";
const Layout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && (
        <Sidebar
          isMobile={isSidebarVisible}
          isMinimized={isMinimized}
          toggleSidebar={toggleSidebar}
          toggleMinimize={toggleMinimize}
        />
      )}
      <ContentWrapper isMinimized={isMinimized}>
        {!isLoginPage && <Header toggleSidebar={toggleSidebar} />}
        {children}
      </ContentWrapper>
    </>
  );
};
const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoriesScreen />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/orders" element={<OrderScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/product/:id/edit" element={<ProductEditScreen />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
