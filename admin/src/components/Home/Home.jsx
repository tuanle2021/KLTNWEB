import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
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
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

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

      <TableOrder orders={orders} status={false} />
    </ContentMain>
  );
};

export default Home;
