import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Center,
  Box,
  Input,
  FormControl,
  Button,
  Select,
  FormLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [state, setState] = useState(shippingAddress.state);
  const [landmark, setLandmark] = useState(shippingAddress.landmark);
  const [region, setRegion] = useState(shippingAddress.region);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        region,
        city,
        phone,
        state,
        landmark,
      })
    );
    props.history.push("/shippingmethod");
  };
  return (
    <Box>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Box
        mx={{ base: "10%", md: "20%" }}
        my="20px"
        p="1rem"
        shadow="xl"
        backgroundColor="white"
      >
        <Center>
          <Text
            textAlign="center"
            color="blue.900"
            fontWeight="bold"
            fontSize="lg"
          >
            Shipping Address
          </Text>
        </Center>

        <form onSubmit={submitHandler}>
          <>
            <VStack alignContent="center">
              <FormControl id="fullname" isRequired>
                <FormLabel color="blue.900">Fullname</FormLabel>
                <Input
                  color="blue.700"
                  placeholder="Enter your fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>

              <FormControl id="address" isRequired>
                <FormLabel color="blue.900">Address</FormLabel>
                <Input
                  placeholder="Your house address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="city" isRequired>
                <FormLabel color="blue.900">City</FormLabel>
                <Input
                  color="blue.900"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormControl>
              <FormControl id="state" isRequired>
                <FormLabel color="blue.900">State</FormLabel>
                <Input
                  color="blue.700"
                  placeholder="Your State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </FormControl>
              <FormControl id="landmark" isRequired>
                <FormLabel color="blue.900">Landmark</FormLabel>
                <Input
                  color="blue.700"
                  placeholder="nearest bustop, school, mosque, church etc"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel color="blue.900">Phone Number</FormLabel>
                <Input
                  color="blue.700"
                  placeholder="Enter your phone number"
                  value={phone}
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
              <FormControl id="region" isRequired>
                <FormLabel color="blue.900">Region</FormLabel>
                <Select
                  color="blue.700"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="">Select Region</option>
                  <option value="South West">South West</option>
                  <option value="South East">South East</option>
                  <option value="South South">South South</option>
                  <option value="North">North</option>
                  <option value="FCT">FCT</option>
                </Select>
              </FormControl>

              <Button
                type="submit"
                color="yellow.400"
                backgroundColor="blue.900"
                _hover={{ color: "blue.900", backgroundColor: "yellow.400" }}
                size="sm"
              >
                Continue
              </Button>
            </VStack>
          </>
        </form>
      </Box>
    </Box>
  );
}
