import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
//import Select from "react-select";
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
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function UpdateProductScreen(props) {
  const productId = props.match.params.id;

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [tag, setTag] = useState("");

  const [description, setDescription] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    product: successUpdate,
    updated,
  } = productUpdate;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);

      setCategory(product.category);
      setPrice(product.price);
      setOrigin(product.origin);
      setSku(product.sku);
      setDescription(product.description);

      setTag(product.tag);
    }
  }, [product, dispatch, productId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        origin,
        sku,
        category,
        price,
        description,
        tag,
      })
    );
  };
  return (
    <Box m="1rem" p="1rem">
      {loading && <LoadingBox size="md"></LoadingBox>}
      {error && (
        <MessageBox
          status="error"
          description={error}
          title="Oops"
        ></MessageBox>
      )}
      {loadingUpdate && <LoadingBox size="md"></LoadingBox>}
      {errorUpdate && (
        <MessageBox
          status="error"
          description={error}
          title="Oops"
        ></MessageBox>
      )}
      {updated && (
        <MessageBox
          status="success"
          description="Product has been updated successfully"
          title="Success"
          reset={PRODUCT_UPDATE_RESET}
        ></MessageBox>
      )}
      <Button
        leftIcon={<FaLongArrowAltLeft />}
        colorScheme="blue"
        variant="outline"
        onClick={() => props.history.push(`/productlist`)}
      >
        Go to products
      </Button>
      <Box mx="20px" my="20px" p="1rem" shadow="xl" backgroundColor="white">
        <Center>
          <Text fontWeight="bold" size="2rem" color="blue.900">
            Edit Product
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

              <FormControl id="sku" isRequired>
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
                Save
              </Button>
            </VStack>
          </>
        </form>
      </Box>
    </Box>
  );
}
