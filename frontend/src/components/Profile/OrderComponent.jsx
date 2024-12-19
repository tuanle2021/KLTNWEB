import React from "react";

const OrderComponent = ({ item }) => {
  return (
    <div>
      <h3>{item.product_id.name}</h3>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${item.price}</p>
    </div>
  );
};

export default OrderComponent;
