import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { createOrder } from "../actions/orderActions";
import { setShippingFee } from "../utilities/shippingPrice";
//import { detailsCart } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { detailsCart } from "../actions/cartActions";
//import LoadingBox from "../components/LoadingBox";
//import MessageBox from "../components/MessageBox";
import { deleteCart } from "../actions/cartActions";
import {
  SimpleGrid,
  GridItem,
  Box,
  Grid,
  Image,
  Text,
  VStack,
  Spacer,
  HStack,
} from "@chakra-ui/react";

export default function PlaceOrder(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order } = orderCreate;
  const cart = useSelector((state) => state.cartDetails);
  const { items } = cart;
  const cartLocal = useSelector((state) => state.cart);
  const { shippingAddress, shippingMethod, cartId } = cartLocal;
  if (!shippingMethod) {
    props.history.push("/shippingmethod");
  }
  const dispatch = useDispatch();

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  if (items) {
    cart.itemsPrice = toPrice(
      items.reduce((a, c) => a + c.quantity * c.product.price, 0)
    );
  }
  let shippingFee;
  if (shippingMethod === "Logistics") {
    shippingFee = setShippingFee(shippingAddress.region);
  } else {
    shippingFee = 0;
  }

  // cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  //cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  const totalPrice = cart.itemsPrice + shippingFee;

  const publicKey = process.env.REACT_APP_PAYSTACK_KEY;

  const email = userInfo.email;
  const userId = userInfo._id;
  const name = userInfo.name;
  const phone = userInfo.phone;
  const onSuccess = () => {
    dispatch(
      createOrder({
        shippingAddress,
        shippingMethod,
        items,
        userId,
        name,
        email,
        totalPrice,
        shippingFee,
        itemsPrice: cart.itemsPrice,
      })
    );
  };

  const onClose = () => {
    alert("Are you sure you want to go back? You will be redirected");
  };
  const componentProps = {
    email,
    amount: totalPrice * 100,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess,
    onClose,
  };
  useEffect(() => {
    dispatch(detailsCart(cartId.idCart));

    if (success) {
      dispatch(deleteCart(cartId.idCart));
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success, props.history, cartId, order]);

  /* const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Confirm and Pay
        </button>
      </div>
    );
  };*/

  return (
    <Box m={{ base: "30px", md: "60px" }}>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      {!items ? (
        <Text>Cart is Empty</Text>
      ) : (
        <SimpleGrid columns={[null, 2]} spacing="12px">
          <GridItem>
            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={2}
              shadow={"md"}
              backgroundColor="white"
            >
              <Text
                fontSize="1rem"
                color="blue.900"
                borderBottomColor="blue.900"
                borderBottomWidth="1px"
                p={3}
                fontWeight="700"
              >
                Shipping Details
              </Text>
              <Text color="blue.900">Name: {shippingAddress.fullName}</Text>
              <Text color="blue.900">
                Address: {shippingAddress.address}, {shippingAddress.city},
              </Text>
              <Text color="blue.900">State: {shippingAddress.state}</Text>
              <Text color="blue.900">Landmark: {shippingAddress.landmark}</Text>
              <Text color="blue.900">Phone: {shippingAddress.phone}</Text>,
            </VStack>
            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={2}
              shadow={"md"}
              backgroundColor="white"
            >
              <Text
                fontSize="1rem"
                color="blue.900"
                borderBottomColor="blue.900"
                borderBottomWidth="1px"
                p={3}
                fontWeight="700"
              >
                Shipping Method
              </Text>
              <Text color="blue.900">{shippingMethod}</Text>
              <Text color="blue.900">
                {shippingMethod === "Logistics" &&
                  "To be sent via a logistics company to the shipping address and will take between 3-5 working days to be delivered."}
                {shippingMethod === "Park" &&
                  "To be sent through a bus driver and you will be contacted by the bus driver for arrangement. Note that once you finalize with the bus driver, we are not liable for the delivery time frame."}
                {shippingMethod === "Other" &&
                  "You will be contacted by one of our representatives on the number you dropped while filling your shipping details form to discuss other alternatives. Please make sure your number is available."}
              </Text>
            </VStack>

            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={2}
              shadow={"md"}
              backgroundColor="white"
            >
              <Text
                fontSize="1rem"
                color="blue.900"
                borderBottomColor="blue.900"
                borderBottomWidth="1px"
                p={3}
                fontWeight="700"
              >
                Order Item(s)
              </Text>
              {items.map((item) => (
                <div key={`${item.product.id}${item.size}`}>
                  <Grid
                    templateColumns="repeat(6, 1fr)"
                    alignItems="center"
                    spacing="3"
                    shadow="md"
                    my="5px"
                    py="5px"
                  >
                    <GridItem colSpan={1} w={{ base: "60px", md: "100px" }}>
                      <Box h="auto" w="auto" mx="8px">
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
                      <Link to={`/product/${item.product.id}`}>
                        <Text color="blue.900">
                          {item.product.name} x {item.quantity}
                        </Text>
                      </Link>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text color="blue.900" fontWeight="500">
                        ₦{item.quantity * item.product.price}
                      </Text>
                    </GridItem>
                  </Grid>
                </div>
              ))}
            </VStack>
          </GridItem>
          <GridItem>
            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={2}
              shadow={"md"}
              backgroundColor="white"
            >
              <Text
                fontSize="1rem"
                color="blue.900"
                borderBottomColor="blue.900"
                borderBottomWidth="1px"
                p={3}
                fontWeight="700"
              >
                Order Summary
              </Text>
              <HStack>
                <Text color="blue.900" fontWeight="500">
                  Items:
                </Text>
                <Spacer />
                <Text color="blue.900" fontWeight="500">
                  ₦{cart.itemsPrice}
                </Text>
              </HStack>
              <HStack>
                <Text color="blue.900" fontWeight="500">
                  Shipping:
                </Text>
                <Spacer />
                <Text color="blue.900" fontWeight="500">
                  ₦{shippingFee}
                </Text>
              </HStack>
              <HStack>
                <Text color="blue.900" fontWeight="500">
                  Order Total:
                </Text>
                <Spacer />
                <Text color="green.500" fontWeight="500">
                  ₦{totalPrice}
                </Text>
              </HStack>
              <Box>
                <PaystackButton {...componentProps} className="paystack-btn" />
              </Box>
            </VStack>
          </GridItem>
        </SimpleGrid>
      )}
    </Box>
  );
}
