import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  dealProduct,
  deleteProduct,
} from "../actions/productActions";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Alert from "../components/Alert";
import {
  Stack,
  HStack,
  Box,
  Flex,
  Spacer,
  useMediaQuery,
  Text,
  Grid,
  Button,
  Image,
  SimpleGrid,
  IconButton,
  GridItem,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { FaFire, FaCalculator, FaImage } from "react-icons/fa";
import { PRODUCT_DELETE_RESET } from "../constants/productConstants";
export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productDeal = useSelector((state) => state.productDeal);
  const { product: dealProducts } = productDeal;
  const productDelete = useSelector((state) => state.productDelete);
  const { error: deleteError, deleting, deleted } = productDelete;
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const [nameSku, setNameSku] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch, dealProducts, deleted]);

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product));
  };
  const hotDealHandler = (id) => {
    dispatch(dealProduct(id));

    //props.history.push("/");
  };
  const submitHandler = () => {
    dispatch(listProducts({ nameSku }));
  };
  return (
    <Box m="16px" p="1rem">
      <Button
        color="blue.900"
        size={isLargerThan676 ? "md" : "sm"}
        backgroundColor="yellow.400"
        _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
      >
        <Link to="/addproduct">Add Product</Link>
      </Button>
      <Text
        textAlign="center"
        m="1rem"
        color="blue.900"
        fontWeight="bold"
        fontSize={{ base: "2xl", md: "4xl" }}
      >
        Products
      </Text>
      <Box align="center">
        <HStack w="65%">
          <FormControl id="name" isRequired>
            <Input
              focusBorderColor="yellow.400"
              placeholder="Product name or Sku"
              color={"yellow.400"}
              onChange={(e) => setNameSku(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            color="yellow.400"
            backgroundColor="blue.900"
            _hover={{
              color: "blue.900",
              backgroundColor: "yellow.400",
            }}
            onClick={submitHandler}
          >
            Find
          </Button>
        </HStack>
      </Box>
      {deleted && (
        <MessageBox
          status="success"
          description="Product deleted successfully"
          title="Deleted"
          reset={PRODUCT_DELETE_RESET}
        ></MessageBox>
      )}
      {deleteError && (
        <MessageBox
          status="error"
          description={error}
          title="Oops"
        ></MessageBox>
      )}

      {deleting && <LoadingBox size="md"></LoadingBox>}
      {loading ? (
        <LoadingBox size="md"></LoadingBox>
      ) : error ? (
        <MessageBox
          status="error"
          description={error}
          title="Oops"
        ></MessageBox>
      ) : (
        <Box>
          {isLargerThan676 && (
            <SimpleGrid
              columns={[3, null, 6]}
              spacing="40px"
              borderBottom="solid"
              borderBottomColor="blue.900"
              borderBottomWidth="0.5px"
              my="1rem"
              py="1rem"
            >
              <Box></Box>
              <Box>
                <Text>Name</Text>
              </Box>
              <Box>
                <Text>Stock Qty</Text>
              </Box>
              <Box>
                <Text>Action</Text>
              </Box>
              <Box>
                <Text>Price</Text>
              </Box>
              <Box>Hot Deal</Box>
            </SimpleGrid>
          )}
          {products.map((product) => (
            <div key={product._id}>
              {isLargerThan676 && (
                <SimpleGrid
                  columns={[3, null, 6]}
                  spacing="40px"
                  borderBottom="solid"
                  borderBottomColor="blue.900"
                  borderBottomWidth="0.5px"
                  my="1rem"
                  py="1rem"
                >
                  <Box h="60px" w="60px">
                    <Image
                      boxSize="full"
                      objectFit="cover"
                      src={
                        product.images.length > 0
                          ? product.images[0].url
                          : "/images/sofetelogo.jpg"
                      }
                      alt={product.name}
                      objectPosition="center center"
                      cursor="pointer"
                    />
                  </Box>
                  <HStack color="blue.900" _hover={{ color: "yellow.400" }}>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </HStack>
                  <HStack>
                    <Text
                      color={product.countInStock > 0 ? "green.400" : "red.500"}
                    >
                      {product.countInStock > 0
                        ? product.countInStock
                        : "Out of Stock"}
                    </Text>
                    <IconButton
                      variant="outline"
                      color="green.500"
                      _hover={{ color: "yellow.400" }}
                      icon={<FaCalculator />}
                      size="xs"
                      onClick={() =>
                        props.history.push(`/variation/${product._id}`)
                      }
                    />
                  </HStack>
                  <HStack>
                    <IconButton
                      variant="outline"
                      color="blue.900"
                      _hover={{ color: "yellow.400" }}
                      icon={<EditIcon />}
                      size="xs"
                      onClick={() =>
                        props.history.push(`/products/${product._id}/edit`)
                      }
                    />
                    <IconButton
                      variant="outline"
                      color="green.500"
                      _hover={{ color: "yellow.400" }}
                      icon={<FaImage />}
                      size="xs"
                      onClick={() =>
                        props.history.push(`/manageimage/${product._id}`)
                      }
                    />
                    <Alert
                      click={() => deleteHandler(product._id)}
                      text={"Delete product?"}
                      description={
                        "Are you sure? You can't undo this action afterwards."
                      }
                    ></Alert>
                  </HStack>

                  <HStack>
                    <Text color="blue.900">₦{product.price}</Text>
                  </HStack>
                  <HStack>
                    <IconButton
                      variant="outline"
                      color={product.hotDeal === true ? "red.500" : "gray.500"}
                      _hover={{ color: "yellow.400" }}
                      aria-label="Send email"
                      icon={<FaFire />}
                      size="xs"
                      w="10px"
                      onClick={() => hotDealHandler(product._id)}
                    />
                  </HStack>
                </SimpleGrid>
              )}
              {!isLargerThan676 && (
                <Box>
                  <Stack
                    direction="column"
                    my="2rem"
                    borderLeftWidth="1px"
                    borderRightWidth="1px"
                    p="10px"
                    borderRadius="5px"
                    shadow="lg"
                  >
                    <Box
                      borderBottom="solid"
                      borderBottomColor="blue.900"
                      borderBottomWidth="0.5px"
                    >
                      <Grid
                        templateRows="repeat(1, 1fr)"
                        templateColumns="repeat(5, 1fr)"
                        gap={4}
                      >
                        <GridItem colSpan={1}>
                          <Box h="auto" w="auto">
                            <Image
                              boxSize="full"
                              objectFit="cover"
                              src={product.images[0].url}
                              alt={product.name}
                              objectPosition="center center"
                              cursor="pointer"
                            />
                          </Box>
                        </GridItem>
                        <GridItem colSpan={4}>
                          <Stack direction="column" spacing="1px">
                            <Text color="blue.900">
                              <Link to={`/product/${product._id}`}>
                                {product.name}
                              </Link>
                            </Text>
                            <HStack>
                              <Text
                                color={
                                  product.countInStock > 0
                                    ? "green.400"
                                    : "red.500"
                                }
                              >
                                {product.countInStock > 0
                                  ? product.countInStock
                                  : "Out of Stock"}
                              </Text>{" "}
                              <IconButton
                                variant="outline"
                                color="green.500"
                                _hover={{ color: "yellow.400" }}
                                icon={<FaCalculator />}
                                size="xs"
                                onClick={() =>
                                  props.history.push(
                                    `/variation/${product._id}`
                                  )
                                }
                              />
                            </HStack>
                            <Text color="blue.900">₦{product.price}</Text>
                          </Stack>
                        </GridItem>
                      </Grid>
                    </Box>

                    <Box>
                      <Flex>
                        <IconButton
                          variant="outline"
                          color={
                            product.hotDeal === true ? "red.500" : "gray.500"
                          }
                          _hover={{ color: "yellow.400" }}
                          aria-label="Send email"
                          icon={<FaFire />}
                          size="xs"
                          w="10px"
                          onClick={() => hotDealHandler(product._id)}
                          text={"order"}
                        />

                        <Spacer />
                        <HStack>
                          <IconButton
                            variant="outline"
                            color="blue.900"
                            _hover={{ color: "yellow.400" }}
                            icon={<EditIcon />}
                            size="xs"
                            onClick={() =>
                              props.history.push(
                                `/products/${product._id}/edit`
                              )
                            }
                          />
                          <IconButton
                            variant="outline"
                            color="green.500"
                            _hover={{ color: "yellow.400" }}
                            icon={<FaImage />}
                            size="xs"
                            onClick={() =>
                              props.history.push(`/manageimage/${product._id}`)
                            }
                          />
                          <Alert
                            click={() => deleteHandler(product._id)}
                          ></Alert>
                        </HStack>
                      </Flex>
                    </Box>
                  </Stack>
                </Box>
              )}
            </div>
          ))}
        </Box>
      )}
    </Box>
  );
}
