import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";
import Pagination from "../components/Pagination";
import {
  Stack,
  HStack,
  Box,
  Flex,
  Spacer,
  useMediaQuery,
  Text,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Alert from "../components/Alert";
export default function OrderListScreen(props) {
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, order } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };
  const pageHandler = (page) => {
    dispatch(listOrders(page));
  };

  const handleNextbtn = () => {
    dispatch(listOrders(order.page + 1));

    if (order.page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    dispatch(listOrders(order.page - 1));

    if ((order.page - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  return (
    <Box m="16px" p="1rem">
      <Button
        color="blue.900"
        size={isLargerThan676 ? "md" : "sm"}
        backgroundColor="yellow.400"
        _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
      >
        <Link to="/addproduct">Add Product</Link>
      </Button>
      <Text
        textAlign="center"
        m="1rem"
        fontWeight="bold"
        fontSize={{ base: "2xl", md: "4xl" }}
        color="blue.900"
      >
        Orders
      </Text>
      {orders && orders.length > 0 && (
        <Text textAlign="center" m="1rem" color="blue.900">
          ( {order.totalDocs} orders)
        </Text>
      )}
      {loadingDelete && <LoadingBox size="md"></LoadingBox>}
      {errorDelete && (
        <MessageBox
          status="error"
          description={errorDelete}
          title="Oops"
        ></MessageBox>
      )}
      {successDelete && (
        <MessageBox
          status="success"
          description="Order deleted successfully"
          title="Deleted"
          reset={ORDER_DELETE_RESET}
        ></MessageBox>
      )}
      {loading ? (
        <LoadingBox size="md"></LoadingBox>
      ) : error ? (
        <MessageBox
          status="error"
          description={errorDelete}
          title="Oops"
        ></MessageBox>
      ) : (
        <Box>
          {isLargerThan676 && (
            <SimpleGrid
              columns={[3, null, 7]}
              spacing="20px"
              borderBottom="solid"
              borderBottomColor="blue.900"
              borderBottomWidth="0.5px"
              my="1rem"
              py="1rem"
            >
              <Box>S/N</Box>
              <Box>Trcking No</Box>
              <Box>
                <Text>Buyer</Text>
              </Box>
              <Box>
                <Text>Date</Text>
              </Box>
              <Box>
                <Text>Price</Text>
              </Box>
              <Box>
                <Text>Status</Text>
              </Box>
              <Box>Delete</Box>
            </SimpleGrid>
          )}
          {orders.map((order, i) => (
            <div key={order._id}>
              {isLargerThan676 && (
                <SimpleGrid
                  columns={[3, null, 7]}
                  spacing="20px"
                  borderBottom="solid"
                  borderBottomColor="blue.900"
                  borderBottomWidth="0.5px"
                  my="1rem"
                  py="1rem"
                >
                  <HStack>
                    <Text color="blue.900">{i + 1}</Text>
                  </HStack>
                  <HStack color="blue.900" _hover={{ color: "yellow.400" }}>
                    <Link to={`/order/${order._id}`}>{order.trackingNo}</Link>
                  </HStack>
                  <HStack>
                    <Text color="blue.900">{order.user.name}</Text>
                  </HStack>

                  <HStack>
                    <Text color="blue.900">
                      {order.createdAt.substring(0, 10)}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text color="blue.900">₦{order.totalPrice}</Text>
                  </HStack>

                  <HStack>
                    <Text color="blue.900">
                      {order.isDelivered ? "Delivered" : "Not Delivered"}
                    </Text>
                  </HStack>
                  <HStack>
                    <Alert
                      text={" Delete order?"}
                      description={
                        "Are you sure? You can't undo this action afterwards."
                      }
                      click={() => deleteHandler(order)}
                    />
                  </HStack>
                </SimpleGrid>
              )}
              {!isLargerThan676 && (
                <Box>
                  <Stack
                    direction="column"
                    my="2rem"
                    borderLeftWidth="1px"
                    borderRightWidth="1px"
                    p="10px"
                    borderRadius="5px"
                    shadow="lg"
                  >
                    <Box>
                      <HStack>
                        <Text color="blue.900">
                          <Link to={`/order/${order._id}`}>
                            {order.trackingNo}
                          </Link>
                        </Text>
                        <Spacer />
                        <Text color="blue.900">{order.user.name}</Text>
                      </HStack>
                    </Box>
                    <Box
                      borderBottom="solid"
                      borderBottomColor="blue.900"
                      borderBottomWidth="0.5px"
                    >
                      <HStack>
                        <Text color="blue.900">
                          {order.createdAt.substring(0, 10)}
                        </Text>
                        <Spacer />
                        <Text color="blue.900">₦{order.totalPrice}</Text>
                      </HStack>
                    </Box>
                    <Box>
                      <Flex>
                        <Text color="blue.900">
                          {order.isDelivered ? "Delivered" : "Not Delivered"}
                        </Text>

                        <Spacer />
                        <HStack>
                          <Alert
                            text={" Delete order?"}
                            description={
                              "Are you sure? You can't undo this action afterwards."
                            }
                            click={() => deleteHandler(order)}
                          />
                        </HStack>
                      </Flex>
                    </Box>
                  </Stack>
                </Box>
              )}
            </div>
          ))}
          <Pagination
            pageInfo={order}
            pageHandler={pageHandler}
            handleNextbtn={handleNextbtn}
            handlePrevbtn={handlePrevbtn}
          />
        </Box>
      )}
    </Box>
  );
}
