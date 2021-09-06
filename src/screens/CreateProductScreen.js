import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { FaLongArrowAltLeft } from "react-icons/fa";
import {
  Center,
  Box,
  Input,
  FormControl,
  Button,
  Textarea,
  FormLabel,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function CreateProductScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, success, error, product } = productCreate;

  if (!userInfo) {
    props.history.push("/signin");
  }
  if (success && product) {
    props.history.push(`/manageimage/${product._id}`);
  }
  const [name, setName] = useState("");

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");

  const [sku, setSku] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,

        sku,
        origin,
        category,
        price,
        description,

        tag,
      })
    );
  };

  return (
    <Box m="20px">
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <Button
        leftIcon={<FaLongArrowAltLeft />}
        colorScheme="blue"
        variant="outline"
        onClick={() => props.history.push(`/productlist`)}
      >
        Go to products
      </Button>
      <Box mx="20%" my="20px" p="1rem" shadow="xl" backgroundColor="white">
        <Center>
          <Text fontWeight="bold" size="2rem" color="blue.900">
            Add Product
          </Text>
        </Center>

        <form onSubmit={submitHandler}>
          <>
            <VStack alignContent="center">
              <FormControl id="name" isRequired>
                <FormLabel color="blue.900">Product Name</FormLabel>
                <Input
                  color="blue.700"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl id="origin" isRequired>
                <FormLabel color="blue.900">SKU</FormLabel>
                <Input
                  placeholder="SKU"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="category" isRequired>
                <FormLabel color="blue.900">Category</FormLabel>
                <Input
                  color="blue.900"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormControl>
              <FormControl id="tag" isRequired>
                <FormLabel color="blue.900">Tag</FormLabel>
                <Input
                  color="blue.700"
                  placeholder="Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </FormControl>
              <FormControl id="origin" isRequired>
                <FormLabel color="blue.900">Origin</FormLabel>
                <Input
                  color="blue.700"
                  placeholder="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel color="blue.900">Price</FormLabel>
                <Input
                  color="blue.700"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel color="blue.900">Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe products"
                />
              </FormControl>

              <Button
                type="submit"
                color="yellow.400"
                backgroundColor="blue.900"
                _hover={{ color: "blue.900", backgroundColor: "yellow.400" }}
                size="sm"
              >
                Add Product
              </Button>
            </VStack>
          </>
        </form>
      </Box>
    </Box>
  );
}
