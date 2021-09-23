import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import { subscribe } from "../actions/userActions";

import CartButton from "../components/CartButton";
import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  Image,
  useBreakpointValue,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Icon,
  Stack,
  Grid,
  GridItem,
  Heading,
  Center,
  Square,
} from "@chakra-ui/react";
import { CART_CREATE_RESET } from "../constants/cartConstants";
import { WISHLIST_CREATE_RESET } from "../constants/wishlistConstants";
import { FaRegThumbsUp, FaRegCreditCard, FaTruck } from "react-icons/fa";
import { SUBSCRIPTION_RESET } from "../constants/userConstants";
export default function HomeScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const cartCreate = useSelector((state) => state.cartCreate);
  const { success: successCartCreate } = cartCreate;
  const cartDetails = useSelector((state) => state.cartDetails);
  const { items } = cartDetails;
  const wishlistCreate = useSelector((state) => state.wishlistCreate);
  const { success: successWishlistCreate } = wishlistCreate;
  const wishlistDetails = useSelector((state) => state.wishlistDetails);
  const { items: wishlistItems } = wishlistDetails;
  const subscriptionState = useSelector((state) => state.subscription);
  const { success: subscribeSuccess, error: subscribeError } =
    subscriptionState;

  let trending = [];
  let hotDeal = [];
  let featured = [];
  if (products) {
    for (let product of products) {
      if (product.tag === "trending") {
        trending.push(product);
      }
      if (product.hotDeal) {
        hotDeal.push(product);
      }
      if (product.tag === "featured") {
        featured.push(product);
      }
    }
  }
  useEffect(() => {
    dispatch(listProducts({}));
    //dispatch(detailsCart());
    //dispatch(detailsWishlist());
    dispatch({ type: WISHLIST_CREATE_RESET });
    dispatch({ type: CART_CREATE_RESET });
  }, [dispatch, successWishlistCreate, successCartCreate]);
  const submitHandler = () => {
    dispatch(subscribe({ email }));
    setEmail("");
  };

  return (
    <Box>
      <Slider />
      <Box my="65px">
        <Center>
          <VStack>
            <Heading as="h3" size="lg" color="blue.900">
              TRENDING PRODUCTS
            </Heading>
            <Box h="5px" w="60px" bg="yellow.400" mt="-3px"></Box>
          </VStack>
        </Center>
      </Box>
      {loading ? (
        <LoadingBox size="sm" thickness="2px"></LoadingBox>
      ) : error ? (
        <MessageBox
          status="error"
          description={error}
          title="Oops!"
        ></MessageBox>
      ) : (
        <Center>
          <Box m="10px" w="90%" alignItems="center" justifyItems="center">
            <SimpleGrid
              minChildWidth={{ base: "150px", md: "220px" }}
              spacing={{ base: "20px", md: "30px" }}
              justifyItems="center"
            >
              {trending.map((product) => (
                <Box key={product._id}>
                  <Product
                    product={product}
                    items={items}
                    wishlistItems={wishlistItems}
                  ></Product>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Center>
      )}
      <Box my="65px">
        <Center>
          <VStack>
            <Heading as="h3" size="lg" color="blue.900">
              DEALS OF THE WEEK
            </Heading>
            <Box h="5px" w="60px" bg="yellow.400" mt="-3px"></Box>
          </VStack>
        </Center>
      </Box>
      <Center>
        <Box w="85%" p={4}>
          <SimpleGrid minChildWidth="300px" spacing="40px">
            {products &&
              hotDeal.map((product) => (
                <Box key={product._id}>
                  <Box height="180px" border="solid" borderColor="blue.900">
                    <Grid
                      h="100%"
                      templateRows="repeat(1, 1fr)"
                      templateColumns="repeat(3, 1fr)"
                      gap={4}
                      p="5px"
                    >
                      <GridItem rowSpan={1} colSpan={1}>
                        <Link to={`/product/${product._id}`}>
                          <Image
                            objectFit="cover"
                            objectPosition="center center"
                            boxSize="full"
                            src={product.images.length && product.images[0].url}
                            alt={product.name}
                          />
                        </Link>
                      </GridItem>

                      <GridItem colSpan={2}>
                        <Stack align="start" direction="column" spacing="10px">
                          <Heading ml={0} size="xs" color="blue.900">
                            {product.category}
                          </Heading>
                          <Heading color="blue.900" size="sm">
                            <Link to={`/product/${product._id}`}>
                              {product.name}
                            </Link>
                          </Heading>
                          <Text color="green.500" fontWeight="bold">
                            ₦{product.price}
                          </Text>
                          <CartButton product={product} items={items} />
                        </Stack>
                      </GridItem>
                    </Grid>
                  </Box>
                </Box>
              ))}
          </SimpleGrid>
        </Box>
      </Center>

      <Flex
        my={"65px"}
        w={"full"}
        h={"80vh"}
        backgroundImage={"/images/bg5.jpg"}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            >
              Don't miss out on our monthly flash sales. You can get up to 25%
              off any item purchased.
            </Text>
            <Stack direction={"row"}>
              <Button
                color="blue.900"
                backgroundColor="yellow.400"
                _hover={{
                  color: "yellow.400",
                  backgroundColor: "blue.900",
                }}
                px={6}
              >
                Explore
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <Box my="65px">
        <Center>
          <VStack>
            <Heading as="h3" size="lg" color="blue.900">
              FEATURED PRODUCTS
            </Heading>
            <Box h="5px" w="60px" bg="yellow.400" mt="-3px"></Box>
          </VStack>
        </Center>
      </Box>
      {loading ? (
        <LoadingBox size="sm" thickness="2px"></LoadingBox>
      ) : error ? (
        <MessageBox
          status="error"
          description={error}
          title="Oops!"
        ></MessageBox>
      ) : (
        <Center>
          <Box m="10px" w="90%" alignItems="center" justifyItems="center">
            <SimpleGrid
              minChildWidth={{ base: "150px", md: "220px" }}
              spacing={{ base: "20px", md: "30px" }}
              justifyItems="center"
            >
              {featured.map((product) => (
                <Box key={product._id}>
                  {product.tag === "featured" && (
                    <Product
                      product={product}
                      items={items}
                      wishlistItems={wishlistItems}
                    ></Product>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Center>
      )}
      <Box mx="10px">
        <Center my="65px">
          <SimpleGrid columns={[1, null, 3]} spacing="40px">
            <Flex bg="gray.100" shadow="lg">
              <Square size="150px">
                <Icon color="blue.900" as={FaTruck} w="40px" h="40px" />
              </Square>
              <Center w="200px">
                <VStack px="10px">
                  <Heading size="sm" color="blue.900">
                    Speedy Delivery
                  </Heading>
                  <Text fontSize="sm" color="blue.900" textAlign="center">
                    We deliver with great speed. Our delivery speed can not be
                    matched.
                  </Text>
                </VStack>
              </Center>
            </Flex>
            <Flex bg="gray.100" shadow="lg">
              <Square size="150px">
                <Icon color="blue.900" as={FaRegCreditCard} w="40px" h="40px" />
              </Square>
              <Center w="200px">
                <VStack px="10px">
                  <Heading size="sm" color="blue.900">
                    Secure Payment
                  </Heading>
                  <Text fontSize="sm" color="blue.900" textAlign="center">
                    All payments on Sofete Store are secured with PayStack
                    payment gateway.
                  </Text>
                </VStack>
              </Center>
            </Flex>
            <Flex bg="gray.100" shadow="lg">
              <Square size="150px">
                <Icon color="blue.900" as={FaRegThumbsUp} w="40px" h="40px" />
              </Square>
              <Center w="200px">
                <VStack px="10px">
                  <Heading size="sm" color="blue.900">
                    Quality Products
                  </Heading>
                  <Text fontSize="sm" color="blue.900" textAlign="center">
                    We sell quality products only. Your satisfaction is
                    guaranteed.
                  </Text>
                </VStack>
              </Center>
            </Flex>
          </SimpleGrid>
        </Center>
      </Box>
      <Box>
        {subscribeError && (
          <MessageBox
            status="error"
            description={error}
            title="There was an Error"
            reset={SUBSCRIPTION_RESET}
          ></MessageBox>
        )}
        {subscribeSuccess && (
          <MessageBox
            status="success"
            description="Thanks for Subscribing. We'll always keep you updated."
            title="Subscribed"
            reset={SUBSCRIPTION_RESET}
          ></MessageBox>
        )}
        <Center>
          <VStack w="65%" bg="white" shadow="lg" spacing="30px" p="30px">
            <Text
              textAlign="center"
              color="blue.900"
              fontWeight="bold"
              fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            >
              Be Among The First To Know About New Products
            </Text>
            <FormControl id="email" isRequired w="70%">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Button
              color="yellow.400"
              backgroundColor="blue.900"
              onClick={submitHandler}
              _hover={{
                color: "blue.900",
                backgroundColor: "yellow.400",
              }}
            >
              Subscribe
            </Button>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
}
