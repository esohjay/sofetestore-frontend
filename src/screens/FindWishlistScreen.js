import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { findWishlistDetails } from "../actions/wishlistActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  Stack,
  HStack,
  Box,
  Flex,
  Spacer,
  Input,
  useMediaQuery,
  SearchIcon,
  Text,
  Grid,
  FormControl,
  FormLabel,
  Button,
  Image,
  SimpleGrid,
  Center,
  IconButton,
  GridItem,
} from "@chakra-ui/react";

export default function FindWishlistScreen(props) {
  //const productId = props.match.params.id;
  const [wishlist, setWishlist] = useState("");
  const findWishlist = useSelector((state) => state.findWishlist);
  const { success, error, items } = findWishlist;

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(findWishlistDetails(wishlist));
  }, [dispatch, wishlist]);

  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");

  const submitHandler = () => {
    dispatch(findWishlistDetails(wishlist));
  };

  return (
    <Box m="1.5rem">
      <Box>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <HStack>
          <FormControl id="images" isRequired>
            <Input
              focusBorderColor="yellow.400"
              placeholder="Wishlist Id"
              color={"yellow.400"}
              onChange={(e) => setWishlist(e.target.value)}
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
        {items === "No item" ? (
          <Text>No item Found</Text>
        ) : (
          items &&
          items.length > 0 && (
            <Stack direction="column">
              {items.map((item) => (
                <div key={item.product.id}>
                  {isLargerThan676 && (
                    <SimpleGrid
                      columns={[3, null, 5]}
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
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          objectPosition="center center"
                          cursor="pointer"
                        />
                      </Box>
                      <HStack color="blue.900" _hover={{ color: "yellow.400" }}>
                        <Link to={`/product/${item.product.id}`}>
                          {item.product.name}
                        </Link>
                      </HStack>
                      <HStack>
                        <Text color="blue.900">{item.size}</Text>
                      </HStack>

                      <HStack>
                        <Text color="blue.900">₦{item.product.price}</Text>
                      </HStack>
                      <HStack>
                        <Text color="blue.900">{item.quantity}</Text>
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
                          p="5px"
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
                                  src={item.product.images[0].url}
                                  alt={item.product.name}
                                  objectPosition="center center"
                                  cursor="pointer"
                                />
                              </Box>
                            </GridItem>
                            <GridItem colSpan={4}>
                              <Stack direction="column" spacing="1px">
                                <Text color="blue.900">
                                  {item.product.name}
                                </Text>
                                <Text color="blue.900">{item.size}</Text>
                                <Text color="blue.900">
                                  ₦{item.product.price}
                                </Text>
                              </Stack>
                            </GridItem>
                          </Grid>
                        </Box>
                        <Box>
                          <Text color="blue.900">
                            Quantity: {item.quantity}
                          </Text>
                        </Box>
                      </Stack>
                    </Box>
                  )}
                </div>
              ))}
              <Box>
                <Center>
                  <Stack
                    direction="column"
                    w="400px"
                    spacing="0.5rem"
                    backgroundColor="white"
                    p="10px"
                    shadow="lg"
                  >
                    <Text
                      fontSize="1.2rem"
                      fontWeight="bold"
                      color="blue.900"
                      borderBottom="solid"
                      borderBottomColor="blue.900"
                      borderBottomWidth="0.5px"
                    >
                      Wishlist Summary
                    </Text>

                    <HStack
                      borderBottom="solid"
                      borderBottomColor="blue.900"
                      borderBottomWidth="0.5px"
                      p="5px"
                    >
                      <Text
                        fontSize="1.2rem"
                        fontWeight="bold"
                        color="blue.900"
                      >
                        Items:
                      </Text>
                      <Spacer />
                      <Text fontSize="1rem">
                        {items.reduce((a, c) => a + c.quantity, 0)} Item(s)
                      </Text>
                    </HStack>
                    <HStack p="5px">
                      <Text
                        fontSize="1.2rem"
                        fontWeight="bold"
                        color="blue.900"
                      >
                        Total:
                      </Text>
                      <Spacer />
                      <Text fontSize="1.2rem" color="green.400">
                        ₦
                        {items.reduce(
                          (a, c) => a + c.product.price * c.quantity,
                          0
                        )}
                      </Text>
                    </HStack>
                  </Stack>
                </Center>
              </Box>
            </Stack>
          )
        )}
      </Box>
    </Box>
  );
}
