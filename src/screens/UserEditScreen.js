import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Checkbox,
  useMediaQuery,
  Box,
  VStack,
  Center,
} from "@chakra-ui/react";

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };
  return (
    <Box m="16px" p="1rem">
      <Button
        color="blue.900"
        size={isLargerThan676 ? "md" : "sm"}
        backgroundColor="yellow.400"
        _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
      >
        <Link to="/userlist">Add Product</Link>
      </Button>
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
            <div>
              <Text
                textAlign="center"
                fontSize="3xl"
                fontWeight="medium"
                color="blue.900"
              >
                Edit User {name}
              </Text>

              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
            </div>
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
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
                <FormControl>
                  <FormLabel color="blue.900">Is Admin</FormLabel>
                  <Checkbox
                    id="isAdmin"
                    type="checkbox"
                    isChecked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Checkbox>
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
