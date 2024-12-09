import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeCartSidebar } from "../../redux/slices/cartSlice";
import {
  SidebarWrapper,
  SidebarHeader,
  CloseButton,
  SidebarContent,
  ProductItem,
  ProductImageSidebar,
  ProductInfo,
  ProductTitle,
  ButtonGroup,
  Button,
  Overlay, 
} from "./styles";

const CartSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cart.isOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const sidebarRef = useRef(null);

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={() => dispatch(closeCartSidebar())} />
      <SidebarWrapper className="sidebar-wrapper" ref={sidebarRef}>
        <SidebarHeader>
          <h2>Your Cart</h2>
          <CloseButton onClick={() => dispatch(closeCartSidebar())}>
            &times;
          </CloseButton>
        </SidebarHeader>
        <SidebarContent>
          {cartItems.map((item) => (
            <ProductItem key={item._id}>
              {item.product && item.product.images && (
                <>
                  <ProductImageSidebar
                    src={item.product.images[0]}
                    alt={item.product.name}
                  />
                  <ProductInfo>
                    <ProductTitle href={`/product/${item.product._id}`}>
                      {item.product.name}
                    </ProductTitle>
                    <div>Price: ${item.product.price}</div>
                    <div>Quantity: {item.quantity}</div>
                  </ProductInfo>
                </>
              )}
            </ProductItem>
          ))}
        </SidebarContent>
        <ButtonGroup>
          <Button
            onClick={() => {
              dispatch(closeCartSidebar());
              navigate("/");
            }}
          >
            Continue Shopping
          </Button>
          <Button primary onClick={() => navigate("/checkout")}>
            Checkout
          </Button>
        </ButtonGroup>
      </SidebarWrapper>
    </>
  );
};

export default CartSidebar;
