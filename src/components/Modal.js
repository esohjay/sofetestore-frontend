import React from "react";

import { EditIcon, AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
  Button,
  IconButton,
} from "@chakra-ui/react";

export default function ModalPanel({ content, title, variant, footer = "no" }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        variant="outline"
        color="blue.900"
        _hover={{ color: "yellow.400" }}
        icon={variant === "add" ? <AddIcon /> : <EditIcon />}
        size="xs"
        onClick={onOpen}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.900">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{content}</ModalBody>
          {footer === "yes" && (
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={onClose}>
                Ok
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
