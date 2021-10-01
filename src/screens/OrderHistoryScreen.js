import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Text, Box, Tr, Th, Td } from "@chakra-ui/react";
import Pagination from "../components/Pagination";
export default function OrderHistoryScreen(props) {
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders, order } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  const pageHandler = (page) => {
    dispatch(listOrderMine(page));
  };

  const handleNextbtn = () => {
    dispatch(listOrderMine(order.page + 1));

    if (order.page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    dispatch(listOrderMine(order.page - 1));

    if ((order.page - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
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
        <Box>
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
          <Box my="25px">
            <Pagination
              pageInfo={order}
              pageHandler={pageHandler}
              handleNextbtn={handleNextbtn}
              handlePrevbtn={handlePrevbtn}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
