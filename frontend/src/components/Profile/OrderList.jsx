import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTable, useExpanded } from "react-table";
import { updateOrderStatus } from "../../redux/slices/orderSlice";
import Swl from "sweetalert2";
import OrderComponent from "./OrderComponent";
import MapComponent from "./MapComponent";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  ActionsCell,
  Button,
  StatusBadge,
  ProfileForm,
} from "./styles";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFpdGhpaGlldSIsImEiOiJjbTJ4eTU2YjMwYThxMmpvOGhoZW1oaHh2In0.F3GI89PsdNEEjlk9Q2o8TQ";

const OrderListComponent = ({ title, orders }) => {
  const [reviewingProduct, setReviewingProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [expandedMapIndex, setExpandedMapIndex] = useState(null);
  const [orderCoordinates, setOrderCoordinates] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoordinates = async (address) => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
          )}.json?access_token=${MAPBOX_TOKEN}`
        );
        return response.data.features[0]?.center || [105.8542, 21.0285]; // Default to Hanoi if not found
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        return [105.8542, 21.0285]; // Default to Hanoi on error
      }
    };

    const updateCoordinates = async () => {
      const updatedOrders = await Promise.all(
        orders.map(async (order) => {
          const updatedOrder = { ...order };
          if (order.shipping_address) {
            const endCoords = await fetchCoordinates(order.shipping_address);
            updatedOrder.endCoordinates = endCoords;
          }
          if (order.post_office) {
            const startCoords = await fetchCoordinates(order.post_office);
            updatedOrder.startCoordinates = startCoords;
          }
          return updatedOrder;
        })
      );
      setOrderCoordinates(updatedOrders);
    };

    updateCoordinates();
  }, [orders]);

  const handleCancelOrder = async (orderId) => {
    try {
      await dispatch(updateOrderStatus({ id: orderId, status: "cancelled" }));
      Swl.fire("Success", "Order has been cancelled successfully.", "success");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      Swl.fire("Error", "Failed to cancel order. Please try again.", "error");
    }
  };

  const getTitle = (hash) => {
    switch (hash) {
      case "awaiting_payment":
        return "Awaiting Payment";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "cancelled":
        return "Cancelled";
      default:
        return title;
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Total",
        accessor: "total_price",
        Cell: ({ value }) => `$${value}`,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => <StatusBadge status={value}>{value}</StatusBadge>,
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ row }) => (
          <ActionsCell>
            {row.original.status !== "cancelled" && (
              <Button
                className="map-btn"
                onClick={() => {
                  setExpandedMapIndex(
                    expandedMapIndex === row.index ? null : row.index
                  );
                  console.log(
                    "Start Coordinates:",
                    orderCoordinates[row.index]?.startCoordinates
                  );
                  console.log(
                    "End Coordinates:",
                    orderCoordinates[row.index]?.endCoordinates
                  );
                }}
              >
                {expandedMapIndex === row.index ? "Hide Map" : "Show Map"}
              </Button>
            )}
          </ActionsCell>
        ),
      },
    ],
    [expandedMapIndex, orderCoordinates]
  );

  const data = useMemo(() => orders, [orders]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useExpanded);

  return (
    <ProfileForm>
      <h2>{getTitle(title)}</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHeader {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <React.Fragment key={row.id}>
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandedMapIndex === row.index && (
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        <div style={{ height: "300px" }}>
                          <MapComponent
                            startCoordinates={
                              orderCoordinates[row.index]?.startCoordinates
                            }
                            endCoordinates={
                              orderCoordinates[row.index]?.endCoordinates
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      )}
    </ProfileForm>
  );
};

export default OrderListComponent;
