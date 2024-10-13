import React, { useState, useEffect } from "react";
import {
  ContentMain,
  ContentHeader,
  ContentTittle,
  TotalRow,
  TotalCol,
  TotalCard,
  CardBody,
  IconText,
  Icon,
  Text,
  Title,
  Value,
} from "./styles";
import { FaShoppingBag } from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import { IoLogoUsd } from "react-icons/io";
import TableOrder from "./TableOrder";
const Home = () => {
  const [order, setOrders] = useState([]);

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
        status: "Pending",
      },
      {
        _id: "4",
        user: { name: "Bob Brown", email: "bob@example.com" },
        totalPrice: 250,
        isPaid: false,
        createdAt: new Date(),
        status: "Pending",
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
    <ContentMain>
      <ContentHeader>
        <ContentTittle> Dashboard </ContentTittle>
      </ContentHeader>

      <TotalRow>
        <TotalCol>
          <TotalCard>
            <CardBody>
              <IconText>
                <Icon bgColor="#cce5ff" color="#004085">
                  <IoLogoUsd size={25} />
                </Icon>
                <Text>
                  <Title>Total Sales</Title>
                  <Value>$3800</Value>
                </Text>
              </IconText>
            </CardBody>
          </TotalCard>
        </TotalCol>
        <TotalCol>
          <TotalCard>
            <CardBody>
              <IconText>
                <Icon bgColor="#d4edda" color="#155724">
                  <BiSolidShoppingBags size={25} />
                </Icon>
                <Text>
                  <Title>Total Orders</Title>
                  <Value>5</Value>
                </Text>
              </IconText>
            </CardBody>
          </TotalCard>
        </TotalCol>
        <TotalCol>
          <TotalCard>
            <CardBody>
              <IconText>
                <Icon bgColor="#fff3cd" color="#856404">
                  <FaShoppingBag size={25} />
                </Icon>
                <Text>
                  <Title>Total Products</Title>
                  <Value>250</Value>
                </Text>
              </IconText>
            </CardBody>
          </TotalCard>
        </TotalCol>
      </TotalRow>

      <TableOrder orders={order} status={false} />
    </ContentMain>
  );
};

export default Home;
