import React from "react";
import { Spinner, HStack, Text, Center } from "@chakra-ui/react";
export default function LoadingBox({ size, thickness }) {
  return (
    <Center>
      <HStack>
        <Spinner
          thickness={thickness || "5px"}
          speed="0.65s"
          emptyColor="blue.900"
          color="yellow.400"
          size={size}
        />
        <Text>Please wait...</Text>
      </HStack>
    </Center>
  );
}
