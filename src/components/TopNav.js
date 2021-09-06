import React from "react";

import {
  Stack,
  useMediaQuery,
  Box,
  Flex,
  Icon,
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
              <Icon as={FaPhoneAlt}></Icon>
              <Text>+2348079588943</Text>
            </HStack>
            {isLargerThan676 && (
              <HStack>
                <Icon as={FaEnvelope}></Icon>
                <Text>sofetestore@gmail.com</Text>
              </HStack>
            )}
          </Stack>
          {isLargerThan676 && (
            <Text>5% discount on all orders completed on the website.</Text>
          )}
          <Stack direction={"row"} spacing={6}>
            <Icon as={FaTwitter}></Icon>
            <Icon as={FaFacebook}></Icon>
            <Icon as={FaInstagram}></Icon>
            <Icon as={FaWhatsapp}></Icon>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
