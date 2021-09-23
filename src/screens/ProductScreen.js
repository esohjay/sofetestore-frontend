import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct, createReview } from "../actions/productActions";
import { createCart, detailsCart } from "../actions/cartActions";
import { createWishlist, detailsWishlist } from "../actions/wishlistActions";
import LoadingBox from "../components/LoadingBox";

import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";
import {
  Stack,
  HStack,
  Box,
  Text,
  Textarea,
  Grid,
  FormControl,
  RadioGroup,
  Radio,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Heading,
  Image,
  IconButton,
  Wrap,
  WrapItem,
  Center,
  FormLabel,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FaRegHeart, FaHeart } from "react-icons/fa";
//import CartButton from "../components/CartButton";
import { WISHLIST_CREATE_RESET } from "../constants/wishlistConstants";
import { CART_CREATE_RESET } from "../constants/cartConstants";
export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const [size, setSize] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const cartCreate = useSelector((state) => state.cartCreate);
  const { success: successCartCreate, loading: loadingCartCreate } = cartCreate;
  const cartDetails = useSelector((state) => state.cartDetails);
  const { items } = cartDetails;
  const wishlistCreate = useSelector((state) => state.wishlistCreate);
  const { success: successWishlistCreate } = wishlistCreate;
  const wishlistDetails = useSelector((state) => state.wishlistDetails);
  const { items: wishlistItems } = wishlistDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartId } = cart;
  const wishItems = useSelector((state) => state.wishItems);
  const { wishlistId } = wishItems;
  const toast = useToast();
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;
  let wishlist = [];
  if (wishlistItems && wishlistItems.length) {
    for (let id of wishlistItems) {
      wishlist.push(id.productId);
    }
  }
  let cartIds = [];
  if (items && items.length) {
    for (let id of items) {
      cartIds.push(id.productId);
    }
  }
  const [index, setIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (successReviewCreate) {
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }

    dispatch(detailsCart(cartId.idCart));
    dispatch(detailsWishlist(wishlistId.idWishlist));

    dispatch(detailsProduct(productId));
  }, [
    dispatch,
    productId,
    wishlistId,
    successReviewCreate,
    cartId,
    successWishlistCreate,
    successCartCreate,
  ]);
  /* const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };*/

  const addHandler = () => {
    // props.history.push(`/products/${productId}/cart`);
    if (size) {
      dispatch(createCart(product._id, { size, cartId: cartId.idCart }));
      //dispatch(detailsCart());
    } else {
      toast({
        title: "Action Required.",
        description: "You need to select size.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  const wishlistHandler = () => {
    if (size) {
      dispatch(
        createWishlist(product._id, { size, wishlistId: wishlistId.idWishlist })
      );
      //dispatch(detailsWishlist());
    } else {
      <MessageBox
        status="Action Required."
        description="You need to select size."
        title="Success"
      ></MessageBox>;
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      toast({
        title: "Action Required.",
        description: "Please enter comment and rating",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box m="2rem">
      {successCartCreate && (
        <MessageBox
          status="success"
          description="Product added to cart"
          title="Success"
          reset={CART_CREATE_RESET}
        ></MessageBox>
      )}
      {successWishlistCreate && (
        <MessageBox
          status="success"
          description="Product added to cart"
          title="Success"
          reset={WISHLIST_CREATE_RESET}
        ></MessageBox>
      )}
      {loadingReviewCreate && <LoadingBox size="md"></LoadingBox>}
      {errorReviewCreate && (
        <MessageBox
          status="error"
          description={errorReviewCreate}
          title="Oops"
        ></MessageBox>
      )}
      {successReviewCreate && (
        <MessageBox
          status="success"
          description="Review Created successfully"
          title="Success"
          reset={PRODUCT_REVIEW_CREATE_RESET}
        >
          Deleted
        </MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Box>
          {" "}
          <Button
            color="blue.900"
            size={isLargerThan676 ? "md" : "sm"}
            backgroundColor="yellow.400"
            _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
            m="20px"
          >
            <Link to="/shop">Back to result</Link>
          </Button>
          <Wrap spacing={10}>
            <WrapItem w={{ base: "100%", sm: "80%", lg: "40%" }}>
              <Box height="auto" mx="1rem">
                <Image
                  boxSize="full"
                  objectFit="cover"
                  src={product.images[index].url}
                  alt={product.name}
                  objectPosition="center center"
                />
                <HStack>
                  {product.images.map((img, i) => (
                    <div key={img.url}>
                      <Box h="40px" w="40px" m="1rem">
                        <Image
                          boxSize="full"
                          objectFit="cover"
                          src={img.url}
                          alt={product.name}
                          objectPosition="center center"
                          onClick={(e) => setIndex(i)}
                          cursor="pointer"
                          border="solid"
                          borderColor={i === index ? "blue.900" : "yellow.400"}
                        />
                      </Box>
                    </div>
                  ))}
                </HStack>
              </Box>
            </WrapItem>
            <WrapItem w={{ base: "100%", sm: "80%", lg: "40%" }}>
              <Box mx="1rem">
                <Stack direction="column">
                  <Heading color="blue.900">{product.name}</Heading>
                  <Box>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </Box>
                  <Text color="green.400" fontWeight="medium">
                    ₦{product.price}
                  </Text>
                  <Text color="blue.900">
                    Description: {product.description}
                  </Text>
                  <Text color="blue.900">SKU: {product.sku}</Text>
                  <Text color="blue.900">Category: {product.category}</Text>
                  <Text color="blue.900">
                    Status:
                    {product.countInStock > 0 ? (
                      <Text>In Stock</Text>
                    ) : (
                      <Text>Out of Stock</Text>
                    )}
                  </Text>

                  <Text color="blue.900">Size</Text>
                  <HStack>
                    {product.variation.map((x) => (
                      <div key={x.value}>
                        <Box
                          border="solid"
                          p="10px"
                          cursor="pointer"
                          value={x.value}
                          borderColor={
                            x.value === size ? "blue.900" : "yellow.400"
                          }
                          onClick={() => setSize(x.value)}
                        >
                          {x.value}
                        </Box>
                      </div>
                    ))}
                  </HStack>
                  <HStack>
                    <Button
                      isLoading={loadingCartCreate}
                      isDisabled={product.countInStock <= 0}
                      color="yellow.400"
                      backgroundColor="blue.900"
                      _hover={{
                        color: "blue.900",
                        backgroundColor: "yellow.400",
                      }}
                      onClick={addHandler}
                    >
                      {cartIds && cartIds.includes(product._id)
                        ? "Added To Cart"
                        : "Add To Cart"}
                    </Button>
                    <Box>
                      <IconButton
                        variant="outline"
                        isDisabled={product.countInStock <= 0}
                        bg="yellow.400"
                        color="blue.900"
                        size="md"
                        _hover={{ bg: "blue.900", color: "yellow.400" }}
                        icon={
                          wishlist.length && wishlist.includes(product._id) ? (
                            <FaHeart />
                          ) : (
                            <FaRegHeart />
                          )
                        }
                        onClick={wishlistHandler}
                      />
                    </Box>
                  </HStack>
                </Stack>
              </Box>
            </WrapItem>
          </Wrap>
          <Box>
            <Tabs m="1.5rem">
              <Center>
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Reviews ({product.numReviews})</Tab>
                </TabList>
              </Center>
              <TabPanels>
                <TabPanel>
                  <Text>{product.description}</Text>
                </TabPanel>
                <TabPanel>
                  <Stack direction="column">
                    {product.reviews.length === 0 && (
                      <Box>There is no review yet</Box>
                    )}
                    <Box my="5px">
                      {product.reviews.map((review) => (
                        <div key={review._id}>
                          <Stack direction="column">
                            <Rating rating={review.rating} caption=" "></Rating>
                            <Text>{review.name}</Text>

                            <Text>{review.comment}</Text>
                          </Stack>
                        </div>
                      ))}
                    </Box>
                    <Box my="5px">
                      {userInfo ? (
                        <form onSubmit={submitHandler}>
                          <Heading my="5px" size="sm">
                            Write a customer review
                          </Heading>
                          <Stack direction="column">
                            <Box>
                              <RadioGroup>
                                {Array(5)
                                  .fill("")
                                  .map((_, i) => (
                                    <div key={i + 1}>
                                      <Grid
                                        templateColumns="repeat(1, 1fr)"
                                        gap={6}
                                      >
                                        <FormControl>
                                          <Radio
                                            value={`${i + 1}`}
                                            onChange={(e) =>
                                              setRating(e.target.value)
                                            }
                                          >
                                            <HStack>
                                              {Array(i + 1)
                                                .fill("")
                                                .map((_, i) => (
                                                  <div key={i + 1}>
                                                    <HStack>
                                                      <StarIcon
                                                        key={i}
                                                        color={"yellow.500"}
                                                      />
                                                    </HStack>
                                                  </div>
                                                ))}
                                            </HStack>
                                          </Radio>
                                        </FormControl>
                                      </Grid>
                                    </div>
                                  ))}
                              </RadioGroup>
                            </Box>

                            <FormControl id="review" isRequired>
                              <FormLabel>Comment</FormLabel>
                              <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Say something about this product"
                              />
                            </FormControl>
                            <div>
                              <Button
                                isLoading={loadingReviewCreate}
                                color="yellow.400"
                                backgroundColor="blue.900"
                                _hover={{
                                  color: "blue.900",
                                  backgroundColor: "yellow.400",
                                }}
                                type="submit"
                              >
                                Review
                              </Button>
                            </div>
                          </Stack>
                          <div>
                            {errorReviewCreate && (
                              <MessageBox
                                status="error"
                                description={errorReviewCreate}
                                title="Oops!"
                                reset={PRODUCT_REVIEW_CREATE_RESET}
                              ></MessageBox>
                            )}
                          </div>
                        </form>
                      ) : (
                        <Text textAlign="center" color="color.900">
                          Please{" "}
                          <Link to="/signin" style={{ color: "blue" }}>
                            Sign In
                          </Link>{" "}
                          to write a review
                        </Text>
                      )}
                    </Box>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      )}
    </Box>
  );
}
/* 



 <div className="row top">
            <div className="col-1">
              <ul>
                <li>
                  <button onClick={editHandler} className="primary block">
                    Edit
                  </button>
                </li>

                <li>
                  <button onClick={addHandlers} className="primary block">
                    view cart
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

{product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Size</div>
                          <div>
                            <select
                              required
                              onChange={(e) => setSize(e.target.value)}
                            >
                              {product.size.map((x) => (
                                <option key={x.value} value={x.value}>
                                  {x.value}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={() => addHandler(product)}
                          className="primary block"
                        >
                          Add
                        </button>
                      </li>
                    </>
                  )} */
