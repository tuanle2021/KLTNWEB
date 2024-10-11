import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesScreen from "./pages/CategoriesScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import ProductScreen from "./pages/productScreen";
import LoginPage from "./pages/LoginScreen";
import AddProduct from "./pages/AddProduct";
import UsersScreen from "./pages/UsersScreen";

const AppRoutes = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default AppRoutes;
