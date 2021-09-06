import React from "react";
import { Center, SimpleGrid, Text, Box, Stack } from "@chakra-ui/react";
export default function CheckoutSteps(props) {
  return (
    <Box m="1rem">
      <Center>
        <Stack direction="row" spacing="0" textAlign="center" w="100%">
          <Box
            borderTop="solid"
            borderTopWidth="5px"
            borderTopColor={props.step1 ? "yellow.400" : "gray"}
            w="25%"
          >
            <Text color="blue.900" fontSize={{ base: "12px", md: "16px" }}>
              Sign-In
            </Text>
          </Box>
          <Box
            borderTop="solid"
            borderTopWidth="5px"
            borderTopColor={props.step2 ? "yellow.400" : "gray"}
            w="25%"
          >
            <Text color="blue.900" fontSize={{ base: "12px", md: "16px" }}>
              Shipping Address
            </Text>
          </Box>
          <Box
            borderTop="solid"
            borderTopWidth="5px"
            borderTopColor={props.step3 ? "yellow.400" : "gray"}
            w="25%"
          >
            <Text color="blue.900" fontSize={{ base: "12px", md: "16px" }}>
              Shipping Method
            </Text>
          </Box>
          <Box
            borderTop="solid"
            borderTopWidth="5px"
            borderTopColor={props.step4 ? "yellow.400" : "gray"}
            w="25%"
          >
            <Text color="blue.900" fontSize={{ base: "12px", md: "16px" }}>
              Checkout
            </Text>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}
