import React, { useEffect, useState } from "react";
//import { BrowserRouter, Link, Route } from "react-router-dom";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
//import { detailsCart } from "../actions/cartActions";
import InfiniteScroll from "react-infinite-scroll-component";
//import { detailsWishlist } from "../actions/wishlistActions";
import {
  Box,
  HStack,
  Button,
  Select,
  Checkbox,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Wrap,
  WrapItem,
  Center,
  Drawer,
  SimpleGrid,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Stack,
  DrawerCloseButton,
  useDisclosure,
  Radio,
  RadioGroup,
  Grid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FaFilter } from "react-icons/fa";
import { CART_CREATE_RESET } from "../constants/cartConstants";
export default function AllProductsScreen() {
  const [name, setName] = useState("");

  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [order, setOrder] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [avRating, setAvRating] = useState("");
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);

  const cartCreate = useSelector((state) => state.cartCreate);
  const { success: successCartCreate } = cartCreate;
  const cartDetails = useSelector((state) => state.cartDetails);
  const { items } = cartDetails;
  const wishlistCreate = useSelector((state) => state.wishlistCreate);
  const { success: successWishlistCreate } = wishlistCreate;
  const wishlistDetails = useSelector((state) => state.wishlistDetails);
  const { items: wishlistItems } = wishlistDetails;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, prod } = productList;
  const [productBatch, setProductBatch] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const resetHandler = () => {
    dispatch(listProducts({ order }));
  };
  let categories = [];
  if (products) {
    for (let product of products) {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    }
  }
  useEffect(() => {
    dispatch(listProducts({ order }));

    //dispatch(detailsCart());
    //dispatch(detailsWishlist());

    dispatch({ type: CART_CREATE_RESET });
  }, [dispatch, order, successWishlistCreate, successCartCreate]);
  // console.log(productBatch);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user

    setProductBatch([]);
    onClose();
    dispatch(
      listProducts({ name, category, priceMin, priceMax, avRating, order })
    );
  };
  useEffect(() => {
    if (products) {
      setProductBatch((prevProductBatch) => {
        return [...prevProductBatch, ...products];
      });
    }
  }, [products]);

  const fetchMoreData = () => {
    //dispatch(listProducts({ order }));
    if (prod.hasNextPage) {
      dispatch(
        listProducts({
          page: prod.nextPage,
          name,
          category,
          priceMin,
          priceMax,
          avRating,
          order,
        })
      );
      //products.concat(products);
      //setProductBatch([...productBatch, products]);
    } else {
      setHasMore(false);
    }
  };
  console.log(productBatch);
  return (
    <div>
      <Box>
        <Box m="2rem" px="2rem">
          <HStack>
            <Button
              leftIcon={<FaFilter />}
              color="yellow.400"
              px="23px"
              backgroundColor="blue.900"
              _hover={{
                color: "blue.900",
                backgroundColor: "yellow.400",
              }}
              ref={btnRef}
              onClick={onOpen}
            >
              Filter
            </Button>

            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent bg={"blue.900"} color={"yellow.400"}>
                <DrawerCloseButton />
                <DrawerHeader>Sofete Store</DrawerHeader>
                <DrawerBody>
                  <Box pb={4}>
                    <Stack as={"nav"} spacing={4}>
                      <form className="form" onSubmit={submitHandler}>
                        <FormControl id="search" h={"100px"} w={"200px"}>
                          <FormLabel>Search</FormLabel>
                          <Input
                            focusBorderColor="yellow.400"
                            placeholder="Search"
                            value={name}
                            id="search"
                            color={"yellow.400"}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormControl>

                        <Wrap>
                          <WrapItem>
                            <Center>
                              <Box>
                                <FormControl
                                  id="amount"
                                  h={"100px"}
                                  w={"100px"}
                                >
                                  <FormLabel>From(₦)</FormLabel>
                                  <NumberInput max={1000000} min={0} step={500}>
                                    <NumberInputField
                                      value={priceMin}
                                      onChange={(e) =>
                                        setPriceMin(e.target.value)
                                      }
                                    />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </FormControl>
                              </Box>
                            </Center>
                          </WrapItem>
                          <WrapItem>
                            <Center>
                              <Box>
                                <FormControl
                                  id="amount"
                                  h={"100px"}
                                  w={"100px"}
                                >
                                  <FormLabel>To(₦)</FormLabel>
                                  <NumberInput max={1000000} min={0} step={500}>
                                    <NumberInputField
                                      value={priceMax}
                                      onChange={(e) =>
                                        setPriceMax(e.target.value)
                                      }
                                    />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </FormControl>
                              </Box>
                            </Center>
                          </WrapItem>
                        </Wrap>
                        <Box>
                          {Array(5)
                            .fill("")
                            .map((_, i) => (
                              <div key={i + 1}>
                                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                                  <FormControl>
                                    <RadioGroup>
                                      <Radio
                                        value={`${i + 1}`}
                                        onChange={(e) =>
                                          setAvRating(e.target.value)
                                        }
                                      >
                                        <HStack>
                                          {Array(i + 1)
                                            .fill("")
                                            .map((_, i) => (
                                              <HStack key={i}>
                                                <StarIcon
                                                  color={"yellow.500"}
                                                />
                                              </HStack>
                                            ))}
                                        </HStack>
                                      </Radio>
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                              </div>
                            ))}
                        </Box>

                        <Box h={"100px"} my={"20px"}>
                          {categories.map((category) => (
                            <div key={category}>
                              <Checkbox
                                focusBorderColor="yellow.400"
                                color={"yellow.400"}
                                value={category}
                                name="priceMin"
                                placeholder="Price Min"
                                onChange={(e) => setCategory(e.target.value)}
                              >
                                {category}
                              </Checkbox>
                            </div>
                          ))}
                        </Box>
                        <HStack>
                          <Button
                            variant="outline"
                            color="yellow.100"
                            borderColor
                            size="sm"
                            onClick={resetHandler}
                          >
                            Reset
                          </Button>
                          <Button
                            variant="outline"
                            color="yellow.400"
                            borderColor
                            size="sm"
                            type="submit"
                          >
                            Filter
                          </Button>
                        </HStack>
                      </form>
                    </Stack>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            <Spacer></Spacer>
            <Box w={{ base: "150px", md: "200px" }} m="2rem">
              <Select
                placeholder={`Sort by ${order}`}
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="toprated">Avg. Customer Reviews</option>
              </Select>
            </Box>
          </HStack>
        </Box>
        {loading ? (
          <LoadingBox size="sm"></LoadingBox>
        ) : (
          error && (
            <MessageBox
              status="error"
              description={error}
              title="Oops!"
            ></MessageBox>
          )
        )}
        {productBatch && productBatch.length > 0 && (
          <Center>
            <Box m="10px" w="90%" alignItems="center" justifyItems="center">
              <InfiniteScroll
                dataLength={productBatch.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<LoadingBox size="sm" thickness="2px"></LoadingBox>}
                endMessage={
                  <Text
                    color="blue.900"
                    textAlign="center"
                    fontWeight="medium"
                    m="6px"
                  >
                    No more products
                  </Text>
                }
              >
                <SimpleGrid
                  minChildWidth={{ base: "220px", md: "220px" }}
                  spacing="30px"
                  justifyItems="center"
                >
                  {productBatch.map((product, i) => (
                    <Box key={product._id}>
                      <Product
                        product={product}
                        items={items}
                        wishlistItems={wishlistItems}
                      ></Product>
                    </Box>
                  ))}
                </SimpleGrid>
              </InfiniteScroll>
            </Box>
          </Center>
        )}
      </Box>
    </div>
  );
}
/* 



 


 <Grid
            h="100%"
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={4}
            m="2rem"
            space={9}
          >
            (
            <GridItem colSpan={1}>
              <Grid templateColumns="repeat(1, 1fr)" gap={6} space={6}>
                <form className="form" onSubmit={submitHandler}>
                  <FormControl id="search" h={"100px"} w={"200px"}>
                    <FormLabel>Search</FormLabel>
                    <Input
                      focusBorderColor="yellow.400"
                      placeholder="Search"
                      value={name}
                      id="search"
                      color={"yellow.400"}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>

                  <Wrap>
                    <WrapItem>
                      <Center>
                        <Box>
                          <FormControl id="amount" h={"100px"} w={"100px"}>
                            <FormLabel>From(₦)</FormLabel>
                            <NumberInput max={1000000} min={0}>
                              <NumberInputField
                                value={priceMin}
                                onChange={(e) => setPriceMin(e.target.value)}
                              />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        </Box>
                      </Center>
                    </WrapItem>
                    <WrapItem>
                      <Center>
                        <Box>
                          <FormControl id="amount" h={"100px"} w={"100px"}>
                            <FormLabel>To(₦)</FormLabel>
                            <NumberInput max={1000000} min={0}>
                              <NumberInputField
                                value={priceMax}
                                onChange={(e) => setPriceMax(e.target.value)}
                              />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        </Box>
                      </Center>
                    </WrapItem>
                  </Wrap>
                  <Box>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                          <FormControl as="fieldset">
                            <RadioGroup defaultValue="Itachi">
                              <Radio
                                value={avRating}
                                onChange={(e) => setAvRating(i + 1)}
                              >
                                <HStack>
                                  {Array(i + 1)
                                    .fill("")
                                    .map((_, i) => (
                                      <HStack>
                                        <StarIcon
                                          key={i}
                                          color={"yellow.500"}
                                        />
                                      </HStack>
                                    ))}
                                </HStack>
                              </Radio>
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      ))}
                  </Box>
                  <Box h={"100px"} my={"20px"}>
                    {categories.map((category) => (
                      <div key={category}>
                        <Checkbox
                          focusBorderColor="yellow.400"
                          color={"yellow.400"}
                          value={category}
                          name="priceMin"
                          placeholder="Price Min"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {category}
                        </Checkbox>
                      </div>
                    ))}
                  </Box>
                  <Button colorScheme="teal" size="xs" type="submit">
                    Button
                  </Button>
                </form>
              </Grid>
            </GridItem>
            )
            <GridItem colSpan={3}>
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <Wrap spacing="15px">
                  {products.map((product) => (
                    <WrapItem>
                      <Center>
                        <Product key={product._id} product={product}></Product>
                      </Center>
                    </WrapItem>
                  ))}
                </Wrap>
              )}
            </GridItem>
          </Grid>







<Wrap spacing={"30px"}>
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <WrapItem>
                  <Center>
                    {console.log(prod.totalPages)}
                    {products.map((product) => (
                      <Product key={product._id} product={product}></Product>
                    ))}
                  </Center>
                </WrapItem>
              )}
            </Wrap> */
