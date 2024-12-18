import React, { useEffect } from "react";
import { IoIosCalendar } from "react-icons/io";
import { FaUser, FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderById,
  updateOrderStatus,
} from "../../redux/slices/orderSlice";
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  console.log(order);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  return (
    <Container>
      {loading && (
        <div className="loading">
          <div></div>
        </div>
      )}
      {error && <p>{error}</p>}
      <Button
        className="back-order-list-btn"
        onClick={() => navigate(`/orders`)}
      >
        Go Back
      </Button>
      {order && (
        <>
          <Header>
            <div>
              <div className="date">
                <IoIosCalendar />
                <h5>{new Date(order.createdAt).toLocaleString()}</h5>
              </div>
              <span>#ID {order._id}</span>
            </div>
            <SelectGroup>
              <select value={order.status}>
                <option>Select Option</option>
                <option value="shipped">Shipped</option>
              </select>
              <Button onClick={handleStatusChange}>Save</Button>
            </SelectGroup>
          </Header>
          <Section>
            <OrderDetailCol>
              <OrderBox>
                <FaUser style={{ color: "#0F5132", fontSize: "25px" }} />
              </OrderBox>
              <div className="box-content">
                <h3>Customer</h3>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <a href="#">View profile</a>
              </div>
            </OrderDetailCol>
            <OrderDetailCol>
              <OrderBox>
                <FaTruck style={{ color: "#0F5132", fontSize: "27px" }} />
              </OrderBox>
              <div className="box-content">
                <h3>Shipping</h3>
                <p>{order.shipping_method}</p>
                <p>Payment method: {order.method}</p>
                <p>
                  Status:{" "}
                  <span style={{ color: "#d9534f" }}>
                    {order.payment_status}
                  </span>
                </p>
                <a href="#">Download</a>
              </div>
            </OrderDetailCol>
            <OrderDetailCol>
              <OrderBox>
                <FaMapMarkerAlt
                  style={{ color: "#0F5132", fontSize: "25px" }}
                />
              </OrderBox>
              <div className="box-content">
                <h3>Deliver to</h3>
                <p>City: {user.address.city}</p>
                <p>Street: {user.address.street}</p>
                <p>Country: {user.address.country}</p>
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
                {order.items.map((item) => (
                  <TableRow key={item.product_id._id}>
                    <td className="table-data">{item.product_id.name}</td>
                    <td className="table-data">{item.quantity}</td>
                    <td className="table-data">${item.price.toFixed(2)}</td>
                    <td className="table-data">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </TableRow>
                ))}
                <TableRow>
                  <OrderSummary>
                    <tr className="price-info">
                      <td>Subtotal:</td>
                      <td className="price">${order.total_price.toFixed(2)}</td>
                    </tr>
                    <tr className="price-info">
                      <td>Shipping cost:</td>
                      <td className="price">Free</td>
                    </tr>
                    <tr className="price-info">
                      <td>Total:</td>
                      <td className="price">${order.total_price.toFixed(2)}</td>
                    </tr>
                    {/* <Button className="payment">Confirm Payment</Button> */}
                  </OrderSummary>
                </TableRow>
              </tbody>
            </ProductTable>
          </Section>
        </>
      )}
    </Container>
  );
};

export default OrderDetail;
