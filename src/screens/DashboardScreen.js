import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listOrders } from "../actions/orderActions";
import { allSales } from "../actions/salesActions";
import { listProducts } from "../actions/productActions";
import { listUsers } from "../actions/userActions";

import { Text, Box, VStack, SimpleGrid } from "@chakra-ui/react";

export default function OrderScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const salesList = useSelector((state) => state.salesList);
  const { sales } = salesList;
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  let delivered = 0;
  let pending = 0;

  let returned = 0;

  if (orders) {
    for (let order of orders) {
      if (order.isDelivered) {
        delivered++;
      } else if (order.deliveryStatus === "Pending") {
        pending++;
      } else if (order.deliveryStatus === "Returned") {
        returned++;
      }
    }
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders({}));
    dispatch(listProducts({}));
    dispatch(allSales({}));
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <Box align="center" justify="center">
      <Box w="65%" bg="white" shadow="lg" m="2rem" borderRadius="lg">
        <Text fontSize="1rem" color="blue.900" p={3} fontWeight="700">
          {userInfo.name}
        </Text>
        <Text fontSize="1rem" color="blue.900" p={3} fontWeight="700">
          {userInfo.phone}
        </Text>
        <Text fontSize="1rem" color="blue.900" p={3} fontWeight="700">
          {userInfo.email}
        </Text>
      </Box>
      <Box mx={{ base: "0.1rem", md: "2rem" }} p="2rem">
        <SimpleGrid columns={[1, null, 2]} spacing="20px">
          <Link to="productlist">
            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={4}
              shadow={"lg"}
              backgroundColor="white"
              border="solid"
              borderColor="blue.900"
              borderWidth="thin"
              borderRadius="xl"
            >
              <Text color="blue.900" fontWeight="medium">
                Products
              </Text>
              {products && products.length > 0 ? (
                <Text
                  m="1rem"
                  fontWeight="bold"
                  fontSize="3xl"
                  color="blue.900"
                >
                  {products.length}
                </Text>
              ) : (
                <Text color="blue.900" fontWeight="medium">
                  No product added yet
                </Text>
              )}
              <Text>Number of products on the website</Text>
            </VStack>
          </Link>
          <Link to="/orderlist">
            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={4}
              shadow={"lg"}
              backgroundColor="white"
              border="solid"
              borderColor="blue.900"
              borderWidth="thin"
              borderRadius="xl"
            >
              <Text color="blue.900" fontWeight="medium">
                Total Orders
              </Text>
              {orders && orders.length > 0 ? (
                <Text
                  m="1rem"
                  fontWeight="bold"
                  fontSize="3xl"
                  color="blue.900"
                >
                  {orders.length}
                </Text>
              ) : (
                <Text color="blue.900" fontWeight="medium">
                  No Order yet
                </Text>
              )}
              <Text>Total orders placed on the website</Text>
            </VStack>
          </Link>
          <Link to="/orderlist">
            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={4}
              shadow={"lg"}
              backgroundColor="white"
              border="solid"
              borderColor="blue.900"
              borderWidth="thin"
              borderRadius="xl"
            >
              <Text color="blue.900" fontWeight="medium">
                Delivered Orders: {delivered}
              </Text>

              <Text color="blue.900" fontWeight="medium">
                Pending Orders: {pending}
              </Text>

              <Text color="blue.900" fontWeight="medium">
                Returned Orders: {returned}
              </Text>
            </VStack>
          </Link>
          <Link to="/orderlist">
            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={4}
              shadow={"lg"}
              backgroundColor="white"
              border="solid"
              borderColor="blue.900"
              borderWidth="thin"
              borderRadius="xl"
            >
              <Text color="blue.900" fontWeight="medium">
                Online Sales
              </Text>
              {orders && orders.length > 0 ? (
                <Text
                  m="1rem"
                  fontWeight="bold"
                  fontSize="3xl"
                  color="blue.900"
                >
                  ₦{orders.reduce((a, c) => a + c.totalPrice, 0)}
                </Text>
              ) : (
                <Text color="blue.900" fontWeight="medium">
                  No sales recorded yet
                </Text>
              )}
              <Text>Amount earned from items sold on the website</Text>
            </VStack>
          </Link>
          <Link to="/sales">
            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={4}
              shadow={"lg"}
              backgroundColor="white"
              border="solid"
              borderColor="blue.900"
              borderWidth="thin"
              borderRadius="xl"
            >
              <Text color="blue.900" fontWeight="medium">
                Total Sales
              </Text>
              {sales && sales.length > 0 ? (
                <Text
                  m="1rem"
                  fontWeight="bold"
                  fontSize="3xl"
                  color="blue.900"
                >
                  ₦{sales.reduce((a, c) => a + c.price, 0)}
                </Text>
              ) : (
                <Text color="blue.900" fontWeight="medium">
                  No sales recorded yet
                </Text>
              )}
              <Text>Amount earned from items sold online and offline</Text>
            </VStack>
          </Link>
          <Link to="/userlist">
            <VStack
              spacing="1"
              align="stretch"
              m={3}
              p={4}
              shadow={"lg"}
              backgroundColor="white"
              border="solid"
              borderColor="blue.900"
              borderWidth="thin"
              borderRadius="xl"
            >
              <Text color="blue.900" fontWeight="medium">
                Registered Users
              </Text>
              {users && users.length > 0 ? (
                <Text
                  m="1rem"
                  fontWeight="bold"
                  fontSize="3xl"
                  color="blue.900"
                >
                  {users.length}
                </Text>
              ) : (
                <Text color="blue.900" fontWeight="medium">
                  No Registered user yet
                </Text>
              )}
              <Text>Number of registered users on the website</Text>
            </VStack>
          </Link>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
