import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { detailsProduct, manageImages } from "../actions/productActions";
import Axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  Center,
  Box,
  Input,
  FormControl,
  Button,
  SimpleGrid,
  FormLabel,
  Text,
  Image,
  VStack,
  Checkbox,
  HStack,
} from "@chakra-ui/react";

export default function ManageImageScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [images, setImages] = useState([]);
  const [errorUpload, setErrorUpload] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productImages = useSelector((state) => state.productImages);
  const {
    error: imgError,
    success: imgSuccess,
    product: imgProduct,
  } = productImages;

  const myFiles = [];
  const uploadFileHandler = async (e) => {
    const files = e.target.files;

    const bodyFormData = new FormData();
    //bodyFormData.append("file", files[0]);
    for (let i = 0; i < files.length; i++) {
      bodyFormData.append("file", files[i]);
      setLoadingUpload(true);
      try {
        const { data } = await Axios.post(
          `${process.env.REACT_APP_URL}/api/products/uploads`,
          bodyFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        myFiles.push(data);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
    }
    //setImageFile(bodyFormData);
    /*for (let i = 0; i < files.length; i++) {
      bodyFormData.append("file", files[i]);
      bodyFormData.append("upload_preset", "sofete-store");
      try {
        const { data } = await Axios.post(
          "https://api.cloudinary.com/v1_1/sofete-store/image/upload",
          bodyFormData
        );
        myFiles.push({
          url: data.secure_url,
          filename: data.original_filename,
          publicId: data.public_id,
        });

        setLoadingUpload(false);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
    }*/
    setLoadingUpload(false);
    setImages(myFiles);
  };

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, imgProduct, imgSuccess]);

  /* 
   useEffect(() => {
    if (imgSuccess) {
      dispatch(detailsProduct(productId));
    }
  }, [dispatch, productId, imgProduct, imgSuccess]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };*/

  const addImagesHandler = () => {
    dispatch(manageImages({ images, _id: productId }));
  };
  const toBeDeleted = [];
  const selectImageHandler = (file, e) => {
    if (e && !toBeDeleted.includes(file)) {
      toBeDeleted.push(file);
    } else if (!e && toBeDeleted.includes(file)) {
      const idx = toBeDeleted.indexOf(file);
      toBeDeleted.splice(idx, 1);
    }
    console.log(toBeDeleted);
  };
  const deleteImagesHandler = () => {
    dispatch(manageImages({ toBeDeleted, _id: productId }));
  };

  return (
    <Box>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Box m="20px">
          <Button
            color="yellow.400"
            backgroundColor="blue.900"
            _hover={{
              color: "blue.900",
              backgroundColor: "yellow.400",
            }}
            size="sm"
            onClick={() => {
              props.history.push("/productlist");
            }}
            m="10px"
          >
            Go to products
          </Button>
          <Center>
            <VStack
              spacing="30px"
              shadow="md"
              backgroundColor="white"
              w="70%"
              p="1rem"
              m="1rem"
            >
              <Text
                textAlign="center"
                fontSize={{ base: "lg", md: "2xl" }}
                color="blue.900"
                fontWeight="bold"
              >
                Upload Product Image(s)
              </Text>
              <Box>
                <FormControl id="images" isRequired>
                  <FormLabel color="blue.900">Upload Imgaes</FormLabel>
                  <Input
                    color="blue.700"
                    type="file"
                    multiple
                    placeholder="Upload Image"
                    onChange={uploadFileHandler}
                  />
                </FormControl>
                {loadingUpload && <LoadingBox></LoadingBox>}

                {errorUpload && (
                  <MessageBox variant="danger">
                    Error While uploading, try again.
                  </MessageBox>
                )}
                {imgError && <MessageBox variant="danger">{error}</MessageBox>}
                <Button
                  type="submit"
                  color="yellow.400"
                  backgroundColor="blue.900"
                  _hover={{
                    color: "blue.900",
                    backgroundColor: "yellow.400",
                  }}
                  disabled={loadingUpload || errorUpload}
                  size="sm"
                  m="10px"
                  onClick={addImagesHandler}
                >
                  Add Image
                </Button>
              </Box>
            </VStack>
          </Center>

          {product.images.length > 0 && (
            <Center>
              <Box
                shadow="md"
                backgroundColor="white"
                w="70%"
                p="1rem"
                m="1rem"
              >
                <Text
                  textAlign="center"
                  fontSize={{ base: "lg", md: "2xl" }}
                  color="blue.900"
                  fontWeight="bold"
                  m="20px"
                >
                  Delete Product Image(s)
                </Text>
                <SimpleGrid minChildWidth="110px" spacing="40px">
                  {product.images.map((product, i) => (
                    <Box w="115px">
                      <HStack>
                        <Checkbox
                          size="sm"
                          colorScheme="red"
                          key={product.filename}
                          onChange={(e) =>
                            selectImageHandler(
                              product.filename,
                              e.target.checked
                            )
                          }
                        ></Checkbox>{" "}
                        <Box h="100px" w="100px" mx="8px">
                          <Image
                            boxSize="full"
                            objectFit="cover"
                            src={product.url}
                            alt={product.name}
                            objectPosition="center center"
                            cursor="pointer"
                            key={product.filename}
                          />
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </SimpleGrid>
                <Center>
                  <Button
                    type="submit"
                    color="yellow.400"
                    backgroundColor="blue.900"
                    _hover={{
                      color: "blue.900",
                      backgroundColor: "yellow.400",
                    }}
                    disabled={loadingUpload || errorUpload}
                    size="sm"
                    onClick={deleteImagesHandler}
                    m="10px"
                  >
                    Remove Image
                  </Button>
                </Center>
              </Box>
            </Center>
          )}
        </Box>
      )}
    </Box>
  );
}
