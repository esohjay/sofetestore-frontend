import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { trackOrder } from "../actions/orderActions";

import MessageBox from "../components/MessageBox";

import {
  Button,
  Text,
  Box,
  Spacer,
  VStack,
  FormControl,
  HStack,
  Input,
  Center,
  Icon,
} from "@chakra-ui/react";
import { FaArrowDown } from "react-icons/fa";
export default function TrackOrderScreen(props) {
  const [trackingNumber, setTrackingNumber] = useState("");

  const orderTrack = useSelector((state) => state.orderTrack);
  const { order, error } = orderTrack;

  const goHomeHandler = () => {
    props.history.push(`/shop`);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (order) {
      //dispatch(trackOrder());
    }
  }, [dispatch, order]);
  const trackHandler = () => {
    dispatch(trackOrder(trackingNumber));
  };
  return (
    <Box>
      {error && (
        <MessageBox
          status="error"
          description={error}
          title="Oops"
        ></MessageBox>
      )}
      <Box justify="center" align="center">
        <Text
          color="blue.900"
          my="20px"
          fontSize="lg"
          textAlign="center"
          fontWeight="medium"
        >
          Track Your Order
        </Text>
        <HStack m="1.5rem" w="65%">
          <FormControl id="track" isRequired>
            <Input
              focusBorderColor="yellow.400"
              placeholder="Tracking Number"
              color={"yellow.400"}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            color="yellow.400"
            backgroundColor="blue.900"
            _hover={{
              color: "blue.900",
              backgroundColor: "yellow.400",
            }}
            onClick={trackHandler}
          >
            Track
          </Button>
        </HStack>
        {order && order !== undefined && order.shippingAddress !== undefined && (
          <Box
            mx={{ base: "10px", md: "2rem" }}
            p={{ base: "10px", md: "2rem" }}
          >
            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={2}
              shadow={"md"}
              backgroundColor="white"
              w={{ base: "100%", md: "80%", lg: "70%" }}
            >
              <Text fontSize="1rem" color="blue.900" p={3} fontWeight="700">
                Tracking Number: {order.trackingNo}
              </Text>
            </VStack>

            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p="2rem"
              shadow={"md"}
              backgroundColor="white"
              w={{ base: "100%", md: "80%", lg: "70%" }}
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
            </VStack>

            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={2}
              shadow={"md"}
              backgroundColor="white"
              w={{ base: "100%", md: "80%", lg: "50%" }}
            >
              {order.deliveryTimeline.map((item, i) => (
                <Box key={item.date}>
                  <HStack
                    border="solid"
                    borderWidth="1.5px"
                    borderColor="blue.900"
                    p="8px"
                  >
                    <Text color="blue.900">{item.date.substring(0, 10)}</Text>
                    <Spacer />
                    <Text color="blue.900">{item.status}</Text>
                  </HStack>
                  {i < order.deliveryTimeline.length - 1 && (
                    <Center m="1rem">
                      <Icon color="yellow.400" as={FaArrowDown} />
                    </Center>
                  )}
                </Box>
              ))}
            </VStack>

            <Button
              color="yellow.400"
              backgroundColor="blue.900"
              _hover={{ color: "blue.900", backgroundColor: "yellow.400" }}
              onClick={goHomeHandler}
              align="center"
            >
              Continue Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
