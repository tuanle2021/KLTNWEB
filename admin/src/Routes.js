import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const AppRoutes = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  return (
    <Router>
      <Sidebar
        isMobile={isSidebarVisible}
        isMinimized={isMinimized}
        toggleSidebar={toggleSidebar}
        toggleMinimize={toggleMinimize}
      />{" "}
      <ContentWrapper isMinimized={isMinimized}>
        <Header toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoriesScreen />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/orders" element={<ProductScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/product/:id/edit" element={<ProductEditScreen />} />
        </Routes>
      </ContentWrapper>
    </Router>
  );
};

export default AppRoutes;
