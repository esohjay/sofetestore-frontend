import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Text, Box, Tr, Th, Td } from "@chakra-ui/react";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <Box p="1rem" m="30px" shadow="md" backgroundColor="white">
      <Text textAlign="center" my="1rem">
        Order History
      </Text>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Order/Tracking No</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order._id}>
                <Td color="blue.900" _hover={{ color: "yellow.400" }}>
                  <Link to={`/order/${order._id}`}>{order.trackingNo}</Link>
                </Td>
                <Td>
                  <Link to={`/order/${order._id}`}>
                    {order.createdAt.substring(0, 10)}
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
