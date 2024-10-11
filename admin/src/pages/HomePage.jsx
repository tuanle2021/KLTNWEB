import React from "react";
import Home from "../components/Home/Home";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import { ContentWrap } from "./styles/HomePage";
const HomePage = () => {
  return (
    <div>
      <Sidebar />
      <ContentWrap>
        <Header />
        <Home />
      </ContentWrap>
    </div>
  );
};

export default HomePage;
