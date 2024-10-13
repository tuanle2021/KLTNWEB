import React from "react";
import moment from "moment";
import {
  CardBody,
  TableResponsive,
  Table,
  TableRow,
  TableCell,
  Badge,
  IconLink,
} from "./styles";
import { FaEye } from "react-icons/fa";

const TableOrder = ({ orders, status }) => {
  return (
    <CardBody>
      <TableResponsive>
        <Table>
          <thead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Order Date</TableCell>
              {status && <TableCell>Status</TableCell>}
              <TableCell>Actions</TableCell>
            </TableRow>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <b>{order.user.name}</b>
                </TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>
                  {order.isPaid ? (
                    <Badge variant="success">
                      Paid At {moment(order.paidAt).format("MMM Do YY")}
                    </Badge>
                  ) : (
                    <Badge variant="danger">Not Paid</Badge>
                  )}
                </TableCell>
                <TableCell>{moment(order.createdAt).calendar()}</TableCell>
                {status && order.status === "Delivered" ? (
                  <TableCell>
                    <Badge variant="success"> {order.status}</Badge>
                  </TableCell>
                ) : (
                  <TableCell>
                    <Badge variant="danger"> {order.status}</Badge>
                  </TableCell>
                )}
                <TableCell className="eye">
                  <IconLink to={`/order/${order._id}`}>
                    <FaEye />
                  </IconLink>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableResponsive>
    </CardBody>
  );
};

export default TableOrder;
