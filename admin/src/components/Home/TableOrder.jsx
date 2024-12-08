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
            {orders.slice(0, 14).map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <b>{order.user_id?.name || "N/A"}</b>{" "}
                </TableCell>
                <TableCell>{order.user_id?.email || "N/A"}</TableCell>
                <TableCell>${order.total_price}</TableCell>
                <TableCell>
                  {order.payment_status === "completed" ? (
                    <Badge variant="success">
                      Paid At {moment(order.paidAt).format("MMM Do YY")}
                    </Badge>
                  ) : (
                    <Badge variant="danger">Not Paid</Badge>
                  )}
                </TableCell>
                <TableCell>{moment(order.createdAt).calendar()}</TableCell>
                {status && (
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "processing" ? "success" : "danger"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                )}
                <TableCell className="eye">
                  <IconLink to={`/orders/${order._id}`}>
                    <FaEye fontSize={25} />
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
