import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deliverOrder, detailsOrder } from "../actions/orderActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";
import {
  Divider,
  Button,
  Text,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [status, setStatus] = useState("");
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
    dispatch(deliverOrder({ id: order._id, status }));
  };
  return loading ? (
    <LoadingBox size="md"></LoadingBox>
  ) : error ? (
    <MessageBox status="error" description={error} title="Oops"></MessageBox>
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
            {order.isDelivered ? (
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
                <FormControl id="region" isRequired>
                  <FormLabel color="blue.900">Update Status</FormLabel>
                  <Select
                    color="blue.700"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Delievery Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processed">Processed</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Returned">Returned</option>
                  </Select>
                </FormControl>
                <Button
                  colorScheme="green"
                  variant="outline"
                  onClick={deliverHandler}
                  size="sm"
                  m="8px"
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
