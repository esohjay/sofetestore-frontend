import React from "react";

import {
  Stack,
  useMediaQuery,
  Box,
  Flex,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";

export default function BottomNav() {
  const [isLargerThan676] = useMediaQuery("(min-width: 976px)");
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
  const mailLink = () => {
    window.location = `mailto:sofetestore@gmail.com`;
  };
  const callLink = () => {
    window.location = `tel:+2348079588943`;
  };
  return (
    <>
      <Box
        bg={"blue.700"}
        color={"yellow.400"}
        fontSize={"sm"}
        px={4}
        w={"100%"}
      >
        <Flex h={"50px"} alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={6}>
            <HStack>
              <IconButton
                bg="transparent"
                size="sm"
                color="yellow.400"
                _hover={{ bg: "transparent", color: "yellow.500" }}
                onClick={callLink}
                icon={<FaPhoneAlt />}
              ></IconButton>
              <IconButton
                bg="transparent"
                size="sm"
                color="yellow.400"
                _hover={{ bg: "transparent", color: "yellow.500" }}
                onClick={mailLink}
                icon={<FaEnvelope />}
              ></IconButton>
            </HStack>
          </Stack>
          {isLargerThan676 && (
            <Text>5% discount on all orders completed on the website.</Text>
          )}
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
        </Flex>
      </Box>
    </>
  );
}
