import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateInventory } from "../actions/inventoryActions";

import {
  Box,
  FormLabel,
  FormControl,
  Button,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export default function UpdateForm({ inventory }) {
  const [batch, setBatch] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [origin, setOrigin] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (inventory) {
      setBatch(inventory.batch);
      setCost(inventory.cost);
      setDescription(inventory.description);
      setQuantity(inventory.quantity);
      setDate(inventory.date);
      setOrigin(inventory.origin);
    }
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateInventory({
        id: inventory._id,
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
    <Box>
      <Box m="20px" p="1rem" backgroundColor="white">
        <form onSubmit={submitHandler}>
          <>
            <VStack alignContent="center">
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
