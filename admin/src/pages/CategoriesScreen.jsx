import React from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import { ContentWrap } from "./styles/HomePage";
const CategoriesScreen = () => {
  return (
    <div>
      <Sidebar />
      <ContentWrap>
        <Header />
      </ContentWrap>
    </div>
  );
};

export default CategoriesScreen;
