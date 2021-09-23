import React from "react";

import { Link } from "react-router-dom";
import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";
import CartButton from "../components/CartButton";
import WishlistButton from "../components/WishlistButton";

export default function Product(props) {
  const { product, items, wishlistItems } = props;
  return (
    <div key={product._id}>
      <Box
        w={{ base: "180px", sm: "220px" }}
        h={{ base: "300px", sm: "400px" }}
        bg="white"
        align="center"
        shadow="md"
      >
        <>
          <Link to={`/product/${product._id}`}>
            <Box w="100%" h={{ base: "60%", md: "65%" }}>
              <Image
                src={
                  product.images.length > 0
                    ? product.images[0].url
                    : "/images/sofetelogo.jpg"
                }
                alt={product.name}
                objectFit="cover"
                objectPosition="center center"
                boxSize="full"
              />
            </Box>
          </Link>
          <Center mt="-10" mr="70%">
            <WishlistButton product={product} wishlistItems={wishlistItems} />
          </Center>
          <Box p="10px">
            <Text
              textAlign="center"
              color="blue.900"
              fontSize={{ base: "sm", md: "md" }}
            >
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </Text>
            <Text textAlign="center" color="green.500" fontWeight="medium">
              ₦{product.price}
            </Text>
            <Center>
              <HStack mt="10px">
                <CartButton product={product} items={items} />
              </HStack>
            </Center>
          </Box>
        </>
      </Box>
    </div>
  );
}

/*

<Box
        w={{ base: "150px", sm: "200px" }}
        h={{ base: "320px", sm: "400px" }}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        {product.images.length && (
          <Link to={`/product/${product._id}`}>
            <Box
              w={{ base: "150px", sm: "200px" }}
              h={{ base: "200px", sm: "250px" }}
            >
              <Image
                src={product.images[0].url}
                alt={product.name}
                objectFit="cover"
                objectPosition="center center"
                boxSize="full"
              />
            </Box>
          </Link>
        )}
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            ></Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </Box>

          <Box>
            ₦{product.price}
            <Box as="span" color="gray.600" fontSize="sm"></Box>
          </Box>
        </Box>
      </Box>




 <Box d="flex" mt="2" alignItems="center">
            <Rating rating={product.rating} caption=" "></Rating>
          </Box>
<Link to={`/product/${product._id}`}>
        {product.images.length && (
          <img
            className="medium"
            src={product.images[0].url}
            alt={product.name}
          />
        )}
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} caption=" "></Rating>
        <div className="price">₦{product.price}</div>
      </div>*/
