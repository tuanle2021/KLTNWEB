import React from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import { ContentWrap } from "./styles/HomePage";
const AddProduct = () => {
  return (
    <div>
      <Sidebar />
      <ContentWrap>
        <Header />
      </ContentWrap>
    </div>
  );
};

export default AddProduct;
