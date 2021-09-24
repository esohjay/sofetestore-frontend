import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { bulkMailAction } from "../actions/userActions";

import MessageBox from "../components/MessageBox";
import { ENQUIRY_RESET } from "../constants/userConstants";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export default function BulkMailScreen(props) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  // const [active, setActive] = useState(true);

  const bulkMail = useSelector((state) => state.bulkMail);
  const { success, error } = bulkMail;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ENQUIRY_RESET });
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(bulkMailAction({ title, message }));

    setTitle("");
    setMessage("");
  };

  return (
    <Box>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading color="blue.900" fontSize={"2xl"}>
              Send Email To Customers
            </Heading>
          </Stack>

          {error && (
            <MessageBox
              status="error"
              description={error}
              title="There was an Error"
              reset={ENQUIRY_RESET}
            ></MessageBox>
          )}
          {success && (
            <MessageBox
              status="success"
              description="Thanks for contacting us, we will get back to asap."
              title="Message Sent"
              reset={ENQUIRY_RESET}
            ></MessageBox>
          )}
          <form onSubmit={submitHandler}>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Messsage Title</FormLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>

                <FormControl id="message" isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
                >
                  Send
                </Button>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
}
