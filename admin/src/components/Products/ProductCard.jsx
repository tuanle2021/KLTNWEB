import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import {
  fetchProductById,
  deleteProduct,
} from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CardContainer,
  ProductImage,
  ProductName,
  ProductPrice,
  ButtonGroup,
  ActionButton,
} from "./styles";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.products);

  const handleEdit = () => {
    dispatch(fetchProductById(product._id)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        navigate(`/product/edit/${product._id}`);
      }
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <CardContainer>
      <ProductImage src={product.images[0]} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>${product.price}</ProductPrice>
      <ButtonGroup>
        <ActionButton stylebutton="edit" onClick={handleEdit}>
          <FaPen />
        </ActionButton>
        <ActionButton
          stylebutton="delete"
          onClick={() => handleDelete(product._id)}
        >
          <FaTrashAlt />
        </ActionButton>
      </ButtonGroup>
      {error && (
        <p>Error: {typeof error === "string" ? error : error.message}</p>
      )}
    </CardContainer>
  );
};

export default ProductCard;
