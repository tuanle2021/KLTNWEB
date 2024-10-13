import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import {
  CardContainer,
  ProductImage,
  ProductName,
  ProductPrice,
  ButtonGroup,
  ActionButton,
} from "./styles";

const ProductCard = ({ product }) => {
  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      // Xử lý xóa sản phẩm
      console.log(`Product with id ${id} deleted`);
    }
  };

  return (
    <CardContainer>
      <ProductImage src={product.image} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>${product.price}</ProductPrice>
      <ButtonGroup>
        <ActionButton stylebutton="edit">
          <FaPen />
        </ActionButton>
        <ActionButton stylebutton="delete" onClick={deletehandler}>
          <FaTrashAlt />{" "}
        </ActionButton>
      </ButtonGroup>
    </CardContainer>
  );
};

export default ProductCard;
