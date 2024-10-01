import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slides/productSlice";
import ProductDetail from "../../components/ProductComponent/ProductDetail";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Lấy productId từ URL
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <div>{product && <ProductDetail product={product} />}</div>;
};

export default ProductDetailPage;