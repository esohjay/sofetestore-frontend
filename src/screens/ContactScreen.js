import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { enquiry } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
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
  useToast,
} from "@chakra-ui/react";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const enquiryState = useSelector((state) => state.enquiry);
  const { success, loading, error } = enquiryState;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(enquiry({ email, phone, name, message }));
    setName("");
    setPhone("");
    setMessage("");
    setEmail("");
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
              Make an Enquiry
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
                  <FormLabel>Your Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                  Enquire
                </Button>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
}
