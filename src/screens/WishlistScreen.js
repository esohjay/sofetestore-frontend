import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsWishlist, updateWishlist } from "../actions/wishlistActions";
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
  Text,
  Grid,
  FormControl,
  Button,
  Image,
  SimpleGrid,
  Center,
  IconButton,
  GridItem,
} from "@chakra-ui/react";
import { MinusIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { FaWhatsapp } from "react-icons/fa";
import { WISHLIST_CREATE_RESET } from "../constants/wishlistConstants";
export default function WishlistScreen(props) {
  //const productId = props.match.params.id;

  const wishlistDetails = useSelector((state) => state.wishlistDetails);
  const { loading, wishlistId, error, items } = wishlistDetails;
  const wishlistUpdate = useSelector((state) => state.wishlistUpdate);
  const { success: updateSuccess } = wishlistUpdate;

  // const cartRemove = useSelector((state) => state.cartRemove);
  // const {  success: removeSuccess } = cartRemove;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsWishlist());
    dispatch({ type: WISHLIST_CREATE_RESET });
  }, [dispatch, updateSuccess]);
  const qtyHandler = (prod, qty, size) => {
    dispatch(updateWishlist(prod, { qty, size }));
  };
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  /*const removeHandler = (prod) => {
    dispatch(removeCartItem(prod))
    if(removeSuccess){
  dispatch(detailsCart());
    }
  }*/
  const whatsappShare = () => {
    window.location.href = `https://wa.me/2348079588943?text=Hello%2C%0AI%27m%20interested%20in%20the%20items%20added%20to%20my%20wishlist%2C%20kindly%20check%20them%20out.%0AWishlist%20id%20is%20%3A%20${wishlistId}`;
  };

  return (
    <Box m="1.5rem">
      <Text
        fontSize="2xl"
        fontWeight="medium"
        color="blue.900"
        textAlign="center"
      >
        Wishlist
      </Text>

      {loading ? (
        <LoadingBox size="md"></LoadingBox>
      ) : error ? (
        <MessageBox
          status="error"
          description={error}
          title="There was an Error"
        ></MessageBox>
      ) : items.length === 0 ? (
        <Text>
          No saved item in your wishlist.
          <Link to="/shop">
            <Button color="blue.900" borderColor variant="outline">
              Go Shopping
            </Button>
          </Link>
        </Text>
      ) : (
        <>
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
                <Text>Size</Text>
              </Box>
              <Box>
                <Text>Quantity</Text>
              </Box>
              <Box>
                <Text>Price</Text>
              </Box>
              <Box></Box>
            </SimpleGrid>
          )}
          {items.map((item) => (
            <div key={item.product.id}>
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
                    <IconButton
                      variant="outline"
                      color="blue.900"
                      _hover={{ color: "yellow.400" }}
                      icon={<MinusIcon />}
                      size="xs"
                      onClick={(e) =>
                        qtyHandler(item.product.id, 0.3, item.size)
                      }
                      isDisabled={item.quantity <= 1}
                    />
                    <FormControl w="30px">
                      <Input
                        defaultValue={item.quantity}
                        size="xs"
                        onBlur={(e) =>
                          qtyHandler(item.product.id, e.target.value, item.size)
                        }
                      ></Input>
                    </FormControl>
                    <IconButton
                      variant="outline"
                      color="blue.900"
                      _hover={{ color: "yellow.400" }}
                      icon={<AddIcon />}
                      size="xs"
                      onClick={(e) =>
                        qtyHandler(item.product.id, 0.5, item.size)
                      }
                      isDisabled={item.quantity >= item.product.variation}
                    />
                  </HStack>

                  <HStack>
                    <Text color="blue.900">₦{item.product.price}</Text>
                  </HStack>
                  <HStack>
                    <IconButton
                      variant="outline"
                      color="blue.900"
                      _hover={{ color: "yellow.400" }}
                      aria-label="Send email"
                      icon={<DeleteIcon />}
                      size="xs"
                      w="10px"
                      onClick={(e) => qtyHandler(item.product.id, 0, item.size)}
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
                              src={item.product.images[0].url}
                              alt={item.product.name}
                              objectPosition="center center"
                              cursor="pointer"
                            />
                          </Box>
                        </GridItem>
                        <GridItem colSpan={4}>
                          <Stack direction="column" spacing="1px">
                            <Text color="blue.900">{item.product.name}</Text>
                            <Text color="blue.900">{item.size}</Text>
                            <Text color="blue.900">₦{item.product.price}</Text>
                          </Stack>
                        </GridItem>
                      </Grid>
                    </Box>
                    <Box>
                      <Flex>
                        <IconButton
                          variant="outline"
                          color="blue.900"
                          _hover={{ color: "yellow.400" }}
                          aria-label="Send email"
                          icon={<DeleteIcon />}
                          size="xs"
                          w="10px"
                          onClick={(e) =>
                            qtyHandler(item.product.id, 0, item.size)
                          }
                        />
                        <Spacer />
                        <HStack>
                          <IconButton
                            variant="outline"
                            color="blue.900"
                            _hover={{ color: "yellow.400" }}
                            icon={<MinusIcon />}
                            size="xs"
                            onClick={(e) =>
                              qtyHandler(item.product.id, 0.3, item.size)
                            }
                            isDisabled={item.quantity <= 1}
                          />
                          <FormControl w="30px">
                            <Input
                              defaultValue={item.quantity}
                              size="xs"
                              onBlur={(e) =>
                                qtyHandler(
                                  item.product.id,
                                  e.target.value,
                                  item.size
                                )
                              }
                            ></Input>
                          </FormControl>
                          <IconButton
                            variant="outline"
                            color="blue.900"
                            _hover={{ color: "yellow.400" }}
                            icon={<AddIcon />}
                            size="xs"
                            onClick={(e) =>
                              qtyHandler(item.product.id, 0.5, item.size)
                            }
                            isDisabled={item.quantity >= item.product.variation}
                          />
                        </HStack>
                      </Flex>
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
                  <Text fontSize="1.2rem" fontWeight="bold" color="blue.900">
                    Items:
                  </Text>
                  <Spacer />
                  <Text fontSize="1rem">
                    {items.reduce((a, c) => a + c.quantity, 0)} Item(s)
                  </Text>
                </HStack>
                <HStack p="5px">
                  <Text fontSize="1.2rem" fontWeight="bold" color="blue.900">
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

                <Button
                  color="blue.900"
                  rightIcon={<FaWhatsapp />}
                  backgroundColor="yellow.400"
                  _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
                  onClick={whatsappShare}
                  disabled={items.length === 0}
                >
                  Share On WhatsApp
                </Button>
              </Stack>
            </Center>
          </Box>
        </>
      )}
    </Box>
  );
}
