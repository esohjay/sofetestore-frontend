import React from "react";

import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Stack,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
export default function DrawerComponent({ links }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div>
      <>
        <HamburgerIcon
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
          display={{ md: "none" }}
          cursor="pointer"
        />

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg={"blue.900"} color={"yellow.400"}>
            <DrawerCloseButton />
            <DrawerHeader>Sofete Store</DrawerHeader>
            <DrawerBody>
              <Box pb={4} display={{ md: "none" }}>
                <Stack as={"nav"} spacing={4}>
                  {links.map((item, i) => (
                    <Link to={item.to} key={i}>
                      <Text
                        _hover={{
                          color: "yellow.300",
                        }}
                      >
                        {item.text}
                      </Text>
                    </Link>
                  ))}
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            Section 1 title
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Stack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </div>
  );
}
