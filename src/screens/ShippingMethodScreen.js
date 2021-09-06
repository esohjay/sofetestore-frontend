import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Radio,
  RadioGroup,
  Box,
  Button,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function ShippingMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [shippingMethod, setShippingMethod] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingMethod(shippingMethod));
    props.history.push("/placeorders");
  };
  return (
    <Box>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Box
        mx={{ base: "20px", md: "20%" }}
        my="20px"
        p="2rem"
        shadow="xl"
        backgroundColor="white"
      >
        <form className="form" onSubmit={submitHandler}>
          <VStack>
            <Text
              fontWeight="bold"
              fontSize={{ base: "1.5rem", md: "2rem" }}
              color="blue.900"
              mb="1rem"
            >
              Shipping Method
            </Text>

            <RadioGroup>
              <Stack direction="column">
                <Radio
                  value="Logistics"
                  onChange={(e) => setShippingMethod(e.target.value)}
                  colorScheme="yellow"
                >
                  <Text color="blue.900" fontWeight="bold">
                    Via Logistics (Recommended)
                  </Text>
                </Radio>
                <Box w="250px">
                  <Text
                    ml="20px"
                    fontSize="12px"
                    border="solid"
                    borderWidth="1px"
                    borderColor="blue.700"
                    color="blue.700"
                    p="5px"
                  >
                    Your order items will be sent to you through a logistic
                    company and will be delivered to your shipping address. It
                    will take between 3 - 5 working days for your items to be
                    delivered.
                  </Text>
                </Box>
                <Radio
                  value="Park"
                  onChange={(e) => setShippingMethod(e.target.value)}
                  colorScheme="yellow"
                >
                  <Text color="blue.900" fontWeight="bold">
                    Via Park
                  </Text>
                </Radio>
                <Box w="250px">
                  <Text
                    ml="20px"
                    fontSize="12px"
                    border="solid"
                    borderWidth="1px"
                    borderColor="blue.700"
                    color="blue.700"
                    p="5px"
                  >
                    Your order items will be taken to a motor park and will be
                    sent through a bus driver. You will be contacted by the bus
                    driver to arrange the delivery. Note that once you finalize
                    with the bus driver, we are not liable for the delivery time
                    frame.
                  </Text>
                </Box>
                <Radio
                  value="Other"
                  onChange={(e) => setShippingMethod(e.target.value)}
                  colorScheme="yellow"
                >
                  <Text color="blue.900" fontWeight="bold">
                    I have another alternative
                  </Text>
                </Radio>
                <Box w="250px">
                  <Text
                    ml="20px"
                    fontSize="12px"
                    border="solid"
                    borderWidth="1px"
                    borderColor="blue.700"
                    color="blue.700"
                    p="5px"
                  >
                    You will be contacted by one of our representatives on the
                    number you dropped while filling your shipping details form
                    to discuss other alternatives. Please make sure your number
                    is available.
                  </Text>
                </Box>
              </Stack>
            </RadioGroup>
            <Button
              color="yellow.400"
              backgroundColor="blue.900"
              _hover={{ color: "blue.900", backgroundColor: "yellow.400" }}
              size="sm"
              type="submit"
            >
              Continue
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
