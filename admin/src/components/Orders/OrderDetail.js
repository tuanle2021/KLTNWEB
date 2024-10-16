import React from "react";
import { IoIosCalendar } from "react-icons/io";
import { FaUser, FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Header,
  Section,
  ProductTable,
  TableHeader,
  TableRow,
  Button,
  NoteInput,
  OrderBox,
  OrderDetailCol,
  OrderSummary,
  SelectGroup,
} from "./styles";

const OrderDetail = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Button
        className="back-order-list-btn"
        onClick={() => navigate(`/orders`)}
      >
        Go Back
      </Button>
      <Header>
        <div>
          <div className="date">
            <IoIosCalendar />
            <h5>Wed, Aug 13, 2020, 4:34PM</h5>
          </div>
          <span>#ID 3453012</span>
        </div>
        <SelectGroup>
          <select>
            <option>Change Status</option>
            <option>Awaiting payment</option>
            <option>Confirmed</option>
            <option>Shipped</option>
          </select>
          <Button>Save</Button>
        </SelectGroup>
      </Header>
      <Section>
        <OrderDetailCol>
          <OrderBox>
            <FaUser style={{ color: "#0F5132", fontSize: "25px" }} />
          </OrderBox>
          <div className="box-content">
            <h3>Customer</h3>
            <p>Huynh Cong</p>
            <p>Huynh@example.com</p>
            <p>+84 012 123 123</p>
            <a href="#">View profile</a>
          </div>
        </OrderDetailCol>
        <OrderDetailCol>
          <OrderBox>
            <FaTruck style={{ color: "#0F5132", fontSize: "27px" }} />
          </OrderBox>
          <div className="box-content">
            <h3>Shipping</h3>
            <p>Fargo express</p>
            <p>Payment method: Card</p>
            <p>
              Status: <span style={{ color: "#d9534f" }}>Payment made</span>
            </p>
            <a href="#">Download</a>
          </div>
        </OrderDetailCol>
        <OrderDetailCol>
          <OrderBox>
            <FaMapMarkerAlt style={{ color: "#0F5132", fontSize: "25px" }} />
          </OrderBox>
          <div className="box-content">
            <h3>Deliver to</h3>
            <p>City: Thu Duc, HCM</p>
            <p>Street: Vo Van Ngan </p>
            <p>Address: 01, TNTT</p>
            <a href="#">Open map</a>
          </div>
        </OrderDetailCol>
      </Section>
      <Section>
        <ProductTable>
          <thead>
            <TableRow>
              <TableHeader>Product</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Unit Price</TableHeader>
              <TableHeader>Total</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            <TableRow>
              <td className="table-data">Supreme helinox chair one</td>
              <td className="table-data">2</td>
              <td className="table-data">$43.50</td>
              <td className="table-data">$87.00</td>
            </TableRow>
            <TableRow>
              <td className="table-data">Gopro hero 7</td>
              <td className="table-data">1</td>
              <td className="table-data">$43.50</td>
              <td className="table-data">$87.00</td>
            </TableRow>
            <TableRow>
              <OrderSummary>
                <tr className="price-info">
                  <td>Subtotal:</td>
                  <td className="price">$973.35</td>
                </tr>
                <tr className="price-info">
                  <td>Shipping cost:</td>
                  <td className="price">$10.00</td>
                </tr>
                <tr className="price-info">
                  <td>Total:</td>
                  <td className="price">$983.00</td>
                </tr>
                <Button className="payment">Confirm Paymented</Button>
              </OrderSummary>
            </TableRow>
          </tbody>
        </ProductTable>
        <div className="address-info">
          <div>
            <h3>Payment info</h3>
            <p>Master Card **** 4768</p>
            <p>Business name: Master Card, inc. </p>
            <p>Phone: +84 012 123 123</p>
          </div>
          <div>
            <h3>Notes</h3>
            <NoteInput type="text" placeholder="Type here" />
            <Button>Save note</Button>
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default OrderDetail;
