import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { Box, Center, SimpleGrid, Text } from "@chakra-ui/react";
export default function SearchScreen(props) {
  const { name = "all" } = useParams();
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cartDetails);
  const { items } = cartDetails;
  const cartCreate = useSelector((state) => state.cartCreate);
  const { success: successCartCreate } = cartCreate;
  const wishlistCreate = useSelector((state) => state.wishlistCreate);
  const { success: successWishlistCreate } = wishlistCreate;
  const wishlistDetails = useSelector((state) => state.wishlistDetails);
  const { items: wishlistItems } = wishlistDetails;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts({ name: name !== "all" ? name : "" }));
  }, [dispatch, name, successWishlistCreate, successCartCreate]);
  return (
    <div>
      <div className="row top">
        <div className="col-3">
          {loading ? (
            <LoadingBox size="md"></LoadingBox>
          ) : error ? (
            <MessageBox
              status="error"
              description={error}
              title="Oops"
            ></MessageBox>
          ) : (
            <>
              <Center>
                <Box m="10px" w="90%" alignItems="center" justifyItems="center">
                  {products.length === 0 && (
                    <MessageBox
                      status="info"
                      description="No product match what you searched for, try again with another keyword"
                      title="No Product Found"
                    ></MessageBox>
                  )}
                  <Text
                    color="blue.900"
                    textAlign="center"
                    fontSize="xl"
                    my="20px"
                    fontWeight="medium"
                  >
                    Showing {products.length} Results
                  </Text>
                  <SimpleGrid
                    minChildWidth={{ base: "160px", md: "180px" }}
                    spacing="30px"
                    justifyItems="center"
                  >
                    {products.map((product) => (
                      <>
                        <Product
                          key={product._id}
                          product={product}
                          items={items}
                          wishlistItems={wishlistItems}
                        ></Product>
                      </>
                    ))}
                  </SimpleGrid>
                </Box>
              </Center>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
