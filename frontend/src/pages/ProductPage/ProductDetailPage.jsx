import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slides/productSlice";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(match.params.id));
  }, [dispatch, match.params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ProductDetailPage product={product} />
    </div>
  );
};

export default ProductDetail;
