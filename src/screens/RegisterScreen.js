import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const handleClickConfirmPw = () => setShowConfirmPw(!showConfirmPw);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password, phone));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading color="blue.900" fontSize={"2xl"}>
              Create an account
            </Heading>
          </Stack>
          {loading && <LoadingBox size="md"></LoadingBox>}
          {error && (
            <MessageBox
              status="error"
              description={error}
              title="Oops"
            ></MessageBox>
          )}
          <form onSubmit={submitHandler}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="Password" isRequired>
                  <FormLabel color="blue.900">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      color="blue.700"
                      placeholder="Enter Password"
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="Confirm Password" isRequired>
                  <FormLabel color="blue.900">Confirm Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      color="blue.700"
                      pr="4.5rem"
                      type={showConfirmPw ? "text" : "password"}
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClickConfirmPw}
                      >
                        {showConfirmPw ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                    color={"blue.400"}
                  >
                    <Text color="black">Have an account?</Text>
                    <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.900"}
                    color={"yellow.400"}
                    _hover={{
                      bg: "yellow.400",
                      color: "blue.900",
                    }}
                  >
                    Register
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </div>
  );
}
