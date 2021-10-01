import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSales } from "../actions/salesActions";
import { convertDate } from "../utilities/changeDate";
import {
  Box,
  FormLabel,
  FormControl,
  Button,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export default function EditSales({ sales }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [size, setSize] = useState("");
  const [batch, setBatch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (sales) {
      setCustomerName(sales.customerName);
      setCustomerPhone(sales.customerPhone);
      setDescription(sales.description);
      setQuantity(sales.quantity);
      setDate(convertDate(sales.date));
      setPrice(sales.price);
      setSize(sales.size);
      setBatch(sales.batch);
    }
  }, [sales]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSales({
        id: sales._id,
        price,
        date,
        description,
        quantity,
        customerName,
        customerPhone,
        batch,
        size,
      })
    );
  };
  return (
    <Box>
      <Box m="20px" p="1rem" backgroundColor="white">
        <form onSubmit={submitHandler}>
          <>
            <VStack alignContent="center">
              <FormControl id="quantity" isRequired>
                <FormLabel color="blue.900">Quantity Sold</FormLabel>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="size" isRequired>
                <FormLabel color="blue.900">Size</FormLabel>
                <Input
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel color="blue.900">Price</FormLabel>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="batch" isRequired>
                <FormLabel color="blue.900">Batch</FormLabel>
                <Input
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="date" isRequired>
                <FormLabel color="blue.900">Date</FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="customerName" isRequired>
                <FormLabel color="blue.900">Customer Name</FormLabel>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="customerPhone">
                <FormLabel color="blue.900">Customer Phone</FormLabel>
                <Input
                  type="number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel color="blue.900">Description</FormLabel>
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  color="blue.700"
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
