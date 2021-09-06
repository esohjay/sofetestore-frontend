import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSales } from "../actions/salesActions";
import { listProducts } from "../actions/productActions";
import ModalPanel from "../components/Modal";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { SALES_CREATE_RESET } from "../constants/salesConstants";
import { Link } from "react-router-dom";
import {
  Box,
  FormLabel,
  FormControl,
  Button,
  Input,
  Textarea,
  Text,
  HStack,
  Stack,
  Image,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@chakra-ui/react";

export default function SalesFormScreen(props) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("");
  const [batch, setBatch] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const salesCreate = useSelector((state) => state.salesCreate);
  const { sales, success, loading, error } = salesCreate;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const dispatch = useDispatch();
  if (success && sales) {
    props.history.push(`/sale/${sales._id}`);
    dispatch({ type: SALES_CREATE_RESET });
  }

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createSales({
        product,
        price,
        date,
        size,
        description,
        quantity,
        customerName,
        customerPhone,
        batch,
      })
    );
  };
  const selectProductHandler = (item) => {
    setProduct(item);
  };
  const PickProduct = () => {
    return (
      <Box>
        {products && products.length > 0 && (
          <FormControl id="region" isRequired>
            <RadioGroup value={`${product._id}`}>
              {products.map((item) => (
                <div key={item._id}>
                  <Stack direction="row" my="5px">
                    <Radio
                      colorScheme="green"
                      value={item._id}
                      onChange={() => selectProductHandler(item)}
                    ></Radio>
                    <Box h="50px" w="50px" mx="8px">
                      <Image
                        boxSize="full"
                        objectFit="cover"
                        src={item.images[0].url}
                        alt={item.name}
                        objectPosition="center center"
                        cursor="pointer"
                      />
                    </Box>
                    <Text>{item.name}</Text>
                  </Stack>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </Box>
    );
  };
  return (
    <Box m="1rem" p="1rem">
      <Button
        color="blue.900"
        size={isLargerThan676 ? "md" : "sm"}
        backgroundColor="yellow.400"
        _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
        m="20px"
      >
        <Link to="/sales">All Sales</Link>
      </Button>
      <Box backgroundColor="white" p="2rem" mx="10%" shadow="lg">
        {loading && <LoadingBox size="md"></LoadingBox>}
        {error && (
          <MessageBox
            status="error"
            description={error}
            title="Oops"
          ></MessageBox>
        )}
        <Box>
          <HStack>
            <Text>Select Product</Text>
            <ModalPanel
              content={<PickProduct />}
              title="Select Product"
              footer="yes"
              variant="add"
            />
          </HStack>
          <form onSubmit={submitHandler}>
            <Stack direction="column">
              {product && (
                <HStack>
                  <Box h="50px" w="50px" mx="8px">
                    <Image
                      boxSize="full"
                      objectFit="cover"
                      src={product.images[0].url}
                      alt={product.name}
                      objectPosition="center center"
                      cursor="pointer"
                    />
                  </Box>
                  <Text>{product.name}</Text>
                </HStack>
              )}

              <FormControl id="quantity" isRequired>
                <FormLabel color="blue.900">Quantity Sold</FormLabel>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
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
              <FormControl id="size" isRequired>
                <FormLabel color="blue.900">Size</FormLabel>
                <RadioGroup>
                  <Stack spacing={4} direction="row">
                    {product &&
                      product.variation.map((vary) => (
                        <Radio
                          value={`${vary.value}`}
                          onChange={(e) => setSize(e.target.value)}
                        >
                          {vary.value}
                        </Radio>
                      ))}{" "}
                  </Stack>
                </RadioGroup>
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
              <FormControl id="name" isRequired>
                <FormLabel color="blue.900">Customer Name</FormLabel>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="phone">
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
                isDisabled={!product}
              >
                Continue
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
