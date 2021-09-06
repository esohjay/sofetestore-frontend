import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInventory } from "../actions/inventoryActions";
import { Link } from "react-router-dom";
import { INVENTORY_CREATE_RESET } from "../constants/inventoryConstants";
import {
  Box,
  Input,
  FormControl,
  Button,
  FormLabel,
  Text,
  VStack,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function InventoryFormScreen(props) {
  const inventoryCreate = useSelector((state) => state.inventoryCreate);
  const { loading, success, error, inventory } = inventoryCreate;

  const [batch, setBatch] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const [origin, setOrigin] = useState("");

  const dispatch = useDispatch();
  if (success && inventory) {
    props.history.push(`/inventorylist/${inventory._id}`);
    dispatch({ type: INVENTORY_CREATE_RESET });
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createInventory({
        origin,
        date,
        description,
        quantity,
        cost,
        batch,
      })
    );
  };
  return (
    <Box m="1rem" p="1rem">
      <Button
        color="blue.900"
        size={isLargerThan676 ? "md" : "sm"}
        backgroundColor="yellow.400"
        _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
      >
        <Link to="/inventories">All Batches</Link>
      </Button>
      {loading && <LoadingBox></LoadingBox>}
      {success && (
        <MessageBox
          status="success"
          description="Batch created successfully"
          title="Success"
        ></MessageBox>
      )}
      {error && (
        <MessageBox
          status="error"
          description={error}
          title="Oops"
        ></MessageBox>
      )}
      <Box
        mx={{ base: "10%", md: "20%" }}
        my="20px"
        p="1rem"
        shadow="xl"
        backgroundColor="white"
      >
        <Text
          textAlign="center"
          color="blue.900"
          fontWeight="bold"
          fontSize="lg"
        >
          New Batch
        </Text>

        <form onSubmit={submitHandler}>
          <>
            <VStack alignContent="center" px="20px">
              <FormControl id="batch" isRequired>
                <FormLabel color="blue.900">Batch Name</FormLabel>
                <Input
                  color="blue.700"
                  placeholder="Enter batch name"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                />
              </FormControl>

              <FormControl id="origin" isRequired>
                <FormLabel color="blue.900">Origin</FormLabel>
                <Input
                  placeholder="Your house origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="cost" isRequired>
                <FormLabel color="blue.900">Cost</FormLabel>
                <Input
                  type="number"
                  color="blue.900"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </FormControl>
              <FormControl id="quantity" isRequired>
                <FormLabel color="blue.900">Quantity</FormLabel>
                <Input
                  type="number"
                  color="blue.900"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </FormControl>
              <FormControl id="date" isRequired>
                <FormLabel color="blue.900">Date</FormLabel>
                <Input
                  type="date"
                  color="blue.700"
                  placeholder="Your date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel color="blue.900">description</FormLabel>
                <Textarea
                  color="blue.700"
                  placeholder="Describe details of the purchase"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
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
