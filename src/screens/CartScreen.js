import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsCart, updateCart } from "../actions/cartActions";
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
import { CART_CREATE_RESET } from "../constants/cartConstants";
export default function CartScreen(props) {
  //const productId = props.match.params.id;
  const cartDetails = useSelector((state) => state.cartDetails);
  const { loading, error, items } = cartDetails;
  const cartUpdate = useSelector((state) => state.cartUpdate);
  const { success: updateSuccess } = cartUpdate;
  const cart = useSelector((state) => state.cart);
  const { cartId } = cart;
  // const cartRemove = useSelector((state) => state.cartRemove);
  // const {  success: removeSuccess } = cartRemove;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsCart(cartId.idCart));
    dispatch({ type: CART_CREATE_RESET });
  }, [dispatch, updateSuccess, cartId]);

  const qtyHandler = (prod, qty, size) => {
    dispatch(updateCart(prod, { qty, size, cartId: cartId.idCart }));
  };
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  console.log(cartId.idCart);
  /*const removeHandler = (prod) => {
    dispatch(removeCartItem(prod))
    if(removeSuccess){
  dispatch(detailsCart());
    }
  }*/
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <Box m="1.5rem">
      <Text
        fontSize="2xl"
        fontWeight="medium"
        color="blue.900"
        textAlign="center"
      >
        Shopping Cart
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
          Cart is empty.{" "}
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
            <div key={`${item.product.id}${item.size}`}>
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
                        item.product.images.length > 0
                          ? item.product.images[0].url
                          : "/images/sofetelogo.jpg"
                      }
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
                              src={
                                item.product.images.length > 0
                                  ? item.product.images[0].url
                                  : "/images/sofetelogo.jpg"
                              }
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
                              value={item.quantity}
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
                borderRight="solid"
                borderRightColor="blue.900"
                borderRightWidth="1px"
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
                  Cart Summary
                </Text>

                <HStack
                  spacing="10rem"
                  borderBottom="solid"
                  borderBottomColor="blue.900"
                  borderBottomWidth="0.5px"
                >
                  <Text fontSize="1.2rem" fontWeight="bold" color="blue.900">
                    Items:
                  </Text>
                  <Text fontSize="1rem">
                    {items.reduce((a, c) => a + c.quantity, 0)} Item(s)
                  </Text>
                </HStack>
                <HStack spacing="10rem">
                  <Text fontSize="1.2rem" fontWeight="bold" color="blue.900">
                    Total:
                  </Text>
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
                  backgroundColor="yellow.400"
                  _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
                  onClick={checkoutHandler}
                  disabled={items.length === 0}
                >
                  Checkout
                </Button>
              </Stack>
            </Center>
          </Box>
        </>
      )}
    </Box>
  );
}

/*<ul>
            {items.map((item) => (
              <li key={item.product.id}>
                <div className="row">
                  <div>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product.id}`}>
                      {item.product.name}
                    </Link>
                  </div>
                  <div>{item.size}</div>
                  <button
                    type="button"
                    onClick={() =>
                      qtyHandler(item.product.id, {
                        info: "increase",
                        size: item.size,
                      })
                    }
                    className="primary block"
                    disabled={item.quantity === item.product.qty}
                  >
                    +
                  </button>
                  <div>{item.quantity}</div>
                  <button
                    type="button"
                    onClick={() =>
                      qtyHandler(item.product.id, {
                        info: "decrease",
                        size: item.size,
                      })
                    }
                    className="primary block"
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>

                  <div>₦{item.product.price}</div>
                  <button
                    type="button"
                    onClick={() =>
                      qtyHandler(item.product.id, {
                        info: "remove",
                        size: item.size,
                      })
                    }
                    className="primary block"
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>
                      Subtotal ({items.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : ₦
                      {items.reduce(
                        (a, c) => a + c.product.price * c.quantity,
                        0
                      )}
                    </h2>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={checkoutHandler}
                      className="primary block"
                      disabled={items.length === 0}
                    >
                      Proceed to Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </ul> */
