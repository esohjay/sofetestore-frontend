import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createWishlist } from "../actions/wishlistActions";
//import { Redirect, Route } from "react-router-dom";
import {
  Box,
  HStack,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
} from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import MessageBox from "../components/MessageBox";
import { WISHLIST_CREATE_RESET } from "../constants/wishlistConstants";
export default function WishlistButton(props) {
  const { product, wishlistItems } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const wishlistCreate = useSelector((state) => state.wishlistCreate);
  const { success: successWishlistCreate } = wishlistCreate;
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [size, setSize] = useState("");
  let wishlist = [];
  if (wishlistItems && wishlistItems.length) {
    for (let id of wishlistItems) {
      wishlist.push(id.productId);
    }
  }
  const dispatch = useDispatch();
  const wishlistHandler = () => {
    if (size) {
      dispatch(createWishlist(product._id, { size }));
      //dispatch(detailsWishlist());
    } else {
      alert("Please select Size");
    }
  };
  return (
    <Box>
      {successWishlistCreate && (
        <MessageBox
          status="success"
          description="Product added to wishlist"
          title="Success"
          reset={WISHLIST_CREATE_RESET}
        ></MessageBox>
      )}
      <IconButton
        variant="outline"
        isDisabled={product.countInStock <= 0}
        bg="transparent"
        color="blue.900"
        isRound
        border="solid"
        borderColor="blue.900"
        borderWidth="1px"
        size="sm"
        _hover={{ color: "yellow.400" }}
        icon={
          wishlist.length && wishlist.includes(product._id) ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )
        }
        onClick={() => setIsOpen(true)}
      />
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
              <Button
                color="yellow.400"
                backgroundColor="blue.900"
                _hover={{
                  color: "blue.900",
                  backgroundColor: "yellow.400",
                }}
                onClick={wishlistHandler}
                ml={3}
              >
                Add to Wishlist
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
