import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  Box,
  VStack,
  Center,
} from "@chakra-ui/react";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const handleClickConfirmPw = () => setShowConfirmPw(!showConfirmPw);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setEmail(user.phone);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(
        updateUserProfile({ userId: user._id, phone, name, email, password })
      );
    }
  };
  return (
    <Box>
      <Center>
        <VStack
          align="stretch"
          w="70%"
          backgroundColor="white"
          shadow="md"
          my="2rem"
          mx="3rem"
          p="2rem"
          spacing="1rem"
        >
          <form className="form" onSubmit={submitHandler}>
            <Text
              textAlign="center"
              fontSize="3xl"
              fontWeight="medium"
              color="blue.900"
            >
              User Profile
            </Text>

            {loading ? (
              <LoadingBox size="md"></LoadingBox>
            ) : error ? (
              <MessageBox
                status="error"
                description={error}
                title="There was an Error"
              ></MessageBox>
            ) : (
              <>
                {loadingUpdate && <LoadingBox size="md"></LoadingBox>}
                {errorUpdate && (
                  <MessageBox
                    status="error"
                    description={errorUpdate}
                    title="There was an Error"
                  ></MessageBox>
                )}
                {successUpdate && (
                  <MessageBox
                    status="success"
                    description="Profile Updated Successfully."
                    title="Success"
                    reset={USER_UPDATE_PROFILE_RESET}
                  ></MessageBox>
                )}
                <FormControl id="full-name" isRequired>
                  <FormLabel color="blue.900">Full name</FormLabel>
                  <Input
                    color="blue.700"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="Email" isRequired>
                  <FormLabel color="blue.900">Email</FormLabel>
                  <Input
                    color="blue.700"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel color="blue.900">Phone Number</FormLabel>
                  <Input
                    color="blue.700"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                <Box my="1rem">
                  <Button
                    type="submit"
                    color="yellow.400"
                    backgroundColor="blue.900"
                    _hover={{
                      color: "blue.900",
                      backgroundColor: "yellow.400",
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </>
            )}
          </form>
        </VStack>
      </Center>
    </Box>
  );
}
