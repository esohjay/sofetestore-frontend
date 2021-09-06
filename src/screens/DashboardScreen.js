import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deliverOrder, detailsOrder } from "../actions/orderActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";
import {
  Center,
  Divider,
  Button,
  Text,
  HStack,
  Box,
  VStack,
} from "@chakra-ui/react";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const goHomeHandler = () => {
    props.history.push(`/shop`);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (!order || successDeliver || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, successDeliver, order, orderId]);
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Box>
      <Box mx={{ base: "0.1rem", md: "2rem" }} p="2rem">
        <VStack
          spacing="1"
          align="stretch"
          m={3}
          p={2}
          shadow={"md"}
          backgroundColor="white"
        >
          <Text fontSize="1rem" color="blue.900" p={3} fontWeight="700">
            Order Id: {order._id}
          </Text>
        </VStack>

        <VStack
          spacing="1"
          align="stretch"
          m={3}
          p="2rem"
          shadow={"md"}
          backgroundColor="white"
        >
          <Text
            fontSize="1rem"
            color="blue.900"
            borderBottomColor="blue.900"
            borderBottomWidth="1px"
            p={3}
            fontWeight="700"
          >
            Shipping Details
          </Text>
          <Text color="blue.900">
            Receiver: {order.shippingAddress.fullName}
          </Text>
          <Text color="blue.900">
            Address: {order.shippingAddress.address},{" "}
            {order.shippingAddress.city},
          </Text>
          <Text color="blue.900">State: {order.shippingAddress.state}</Text>
          <Text color="blue.900">
            Landmark: {order.shippingAddress.landmark}
          </Text>
          <Text color="blue.900">Phone: {order.shippingAddress.phone}</Text>

          <Text
            fontSize="1rem"
            color="blue.900"
            borderBottomColor="blue.900"
            borderBottomWidth="1px"
            p={3}
            fontWeight="700"
          >
            Delivery Details
          </Text>
          <Box>
            {order.deliveryStatus === "Delivered" ? (
              <Text color="blue.900">Delivered at {order.deliveredAt}</Text>
            ) : (
              <Text color="blue.900">
                Delivery Status: {order.deliveryStatus}
              </Text>
            )}
            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <Box>
                {loadingDeliver && <LoadingBox></LoadingBox>}
                {errorDeliver && (
                  <MessageBox variant="danger">{errorDeliver}</MessageBox>
                )}
                <Button
                  colorScheme="green"
                  variant="outline"
                  onClick={deliverHandler}
                  size="sm"
                >
                  Deliver Order
                </Button>
              </Box>
            )}
          </Box>
          <Divider orientation="horizontal" color="blue.900" />
          <Text>Tracking Number: {order.trackingNo}</Text>
          <Text>Payment Date: {order.paidAt}</Text>
          <Box>
            <Button
              color="yellow.400"
              backgroundColor="blue.900"
              _hover={{ color: "blue.900", backgroundColor: "yellow.400" }}
              onClick={goHomeHandler}
            >
              Continue Shopping
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
