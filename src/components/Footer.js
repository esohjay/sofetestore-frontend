import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Icon,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
export default function Footer() {
  return (
    <Box bg="black" color="white" mt="50px">
      <Container
        as={Stack}
        w="100%"
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Box>Sofete Store</Box>
        <Stack direction={"row"} spacing={6}>
          <Link to={"/"}>Home</Link>
          <Link to={"/shop"}>Shop</Link>

          <Link to={"/"}>Contact</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2021 Sofete Store. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <Icon as={FaTwitter}></Icon>
            <Icon as={FaFacebook}></Icon>
            <Icon as={FaInstagram}></Icon>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
