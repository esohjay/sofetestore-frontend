import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCart } from "../actions/cartActions";

import {
  Box,
  HStack,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
} from "@chakra-ui/react";
import { CART_CREATE_RESET } from "../constants/cartConstants";
import MessageBox from "../components/MessageBox";
import { FaShoppingBasket } from "react-icons/fa";
export default function CartButton(props) {
  const { product, items } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [size, setSize] = useState("");
  const cartCreate = useSelector((state) => state.cartCreate);
  const { success: successCartCreate } = cartCreate;
  let cartIds = [];
  if (items && items.length) {
    for (let id of items) {
      cartIds.push(id.productId);
    }
  }
  const dispatch = useDispatch();

  const addHandler = () => {
    if (size) {
      dispatch(createCart(product._id, { size }));
      //dispatch(detailsCart());
    } else {
      alert("Please enter comment and rating");
    }
  };
  return (
    <>
      {successCartCreate && (
        <MessageBox
          status="success"
          description="Product added to cart"
          title="Success"
          reset={CART_CREATE_RESET}
        ></MessageBox>
      )}
      <Button
        rightIcon={<FaShoppingBasket />}
        isDisabled={product.countInStock <= 0}
        color="yellow.400"
        backgroundColor="blue.900"
        _hover={{
          color: "blue.900",
          backgroundColor: "yellow.400",
        }}
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        {product.countInStock <= 0
          ? "Out of Stock"
          : cartIds && cartIds.includes(product._id)
          ? "Added to Cart"
          : "Add To Cart"}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        motionPreset="slideInRight"
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx="30px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Select Size
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>Size</Text>
              <HStack>
                {product.variation.map((x) => (
                  <div key={x.value}>
                    <Box
                      border="solid"
                      p="10px"
                      cursor="pointer"
                      value={x.value}
                      borderColor={x.value === size ? "blue.900" : "yellow.400"}
                      onClick={() => setSize(x.value)}
                    >
                      {x.value}
                    </Box>
                  </div>
                ))}
              </HStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Continue Shopping
              </Button>
              <Button colorScheme="red" onClick={addHandler} ml={3}>
                Add to Cart
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
