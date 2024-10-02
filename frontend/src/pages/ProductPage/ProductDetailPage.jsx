import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slides/productSlice";
import ProductDetail from "../../components/ProductComponent/ProductDetail";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Lấy productId từ URL
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Roadmap hiển thị đường dẫn */}
      <Roadmap />
      {product && <ProductDetail product={product} />}
    </div>
  );
};

export default ProductDetailPage;
