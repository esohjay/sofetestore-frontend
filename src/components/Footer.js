import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaFacebook, FaWhatsapp } from "react-icons/fa";
export default function Footer() {
  const whatsappLink = () => {
    window.location.href = `https://wa.me/2348079588943?text=Hello%20Sofete%20Store!`;
  };
  const twitterLink = () => {
    window.location.href = `https://twitter.com/SofeteStore`;
  };
  const instagramLink = () => {
    window.location.href = `https://instagram.com/sofete_vintage_store`;
  };
  const facebookLink = () => {
    window.location.href = `https://facebook.com/sofetestore`;
  };
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

          <Link to={"/contact"}>Contact</Link>
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
            <IconButton
              bg="transparent"
              size="sm"
              color="yellow.400"
              _hover={{ bg: "transparent", color: "yellow.500" }}
              onClick={twitterLink}
              icon={<FaTwitter />}
            ></IconButton>
            <IconButton
              bg="transparent"
              size="sm"
              color="yellow.400"
              _hover={{ bg: "transparent", color: "yellow.500" }}
              onClick={facebookLink}
              icon={<FaFacebook />}
            ></IconButton>
            <IconButton
              bg="transparent"
              size="sm"
              color="yellow.400"
              _hover={{ bg: "transparent", color: "yellow.500" }}
              onClick={instagramLink}
              icon={<FaInstagram />}
            ></IconButton>
            <IconButton
              bg="transparent"
              size="sm"
              color="yellow.400"
              _hover={{ bg: "transparent", color: "yellow.500" }}
              onClick={whatsappLink}
              icon={<FaWhatsapp />}
            ></IconButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
