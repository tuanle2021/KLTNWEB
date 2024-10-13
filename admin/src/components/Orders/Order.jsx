import React, { useState, useEffect } from "react";
import { OrderContainer,SearchBar,SelectGroup } from "./styles";
import TableOrder from "../Home/TableOrder";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mock data for orders
    const mockOrders = [
      {
        _id: "1",
        user: { name: "John Doe", email: "john@example.com" },
        totalPrice: 100,
        isPaid: true,
        paidAt: new Date(),
        createdAt: new Date(),
        status: "Delivered",
      },
      {
        _id: "2",
        user: { name: "Jane Smith", email: "jane@example.com" },
        totalPrice: 200,
        isPaid: false,
        createdAt: new Date(),
        status: "Pending",
      },
      {
        _id: "3",
        user: { name: "Alice Johnson", email: "alice@example.com" },
        totalPrice: 150,
        isPaid: true,
        paidAt: new Date(),
        createdAt: new Date(),
        status: "Shipped",
      },
      {
        _id: "4",
        user: { name: "Bob Brown", email: "bob@example.com" },
        totalPrice: 250,
        isPaid: false,
        createdAt: new Date(),
        status: "Cancelled",
      },
      {
        _id: "5",
        user: { name: "Charlie Davis", email: "charlie@example.com" },
        totalPrice: 300,
        isPaid: true,
        paidAt: new Date(),
        createdAt: new Date(),
        status: "Delivered",
      },
    ];
    setOrders(mockOrders);
  }, []);
  return (
    <OrderContainer>
      <h4>Order</h4>
      <SearchBar>
        <input type="text" placeholder="Search..." />
        <SelectGroup>
          <select>
            <option>All categories</option>
            <option>All categories</option>
            <option>All categories</option>
            <option>All categories</option>
          </select>
          <select>
            <option>Latest added</option>
            <option>Latest added</option>
            <option>Latest added</option>
            <option>Latest added</option>
          </select>
        </SelectGroup>
      </SearchBar>
      <TableOrder orders={orders} status={true} />
    </OrderContainer>
  );
};

export default Order;
