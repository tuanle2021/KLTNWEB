import HomePage from "../pages/HomePage/HomePage";
import NotfoundPage from "../pages/NotfoundPage/NotfoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductPage/ProductDetailPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ActivateForm from "../pages/HomePage/ActivateForm";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/login",
    page: LoginPage,
    isShowHeader: false,
  },
  {
    path: "/activate/:token", // Đảm bảo route này tồn tại
    page: ActivateForm,
    isShowHeader: false,
  },
  {
    path: "/product/:id",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotfoundPage,
  },
];
