import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVariation,
  updateVariation,
  detailsProduct,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { PRODUCT_VARIATION_RESET } from "../constants/productConstants";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { MinusIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function VariationScreen(props) {
  const productId = props.match.params.id;

  const [varType, setVarType] = useState("");
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [variation, setVariation] = useState([]);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const variationUpdate = useSelector((state) => state.variationUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = variationUpdate;
  const variationCreate = useSelector((state) => state.variationCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = variationCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PRODUCT_UPDATE_RESET });
    dispatch({ type: PRODUCT_VARIATION_RESET });
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successCreate, successUpdate]);

  const varVal = {
    varType,
    quantity,
    value,
  };
  //console.log(varVal);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createVariation({
        _id: productId,
        variations: varVal,
      })
    );
  };
  const qtyHandler = (varId, qty) => {
    dispatch(updateVariation({ id: productId, varId, qty }));
  };
  return (
    <Box m="2rem" p="1rem">
      <Button
        leftIcon={<FaLongArrowAltLeft />}
        colorScheme="blue"
        variant="outline"
        onClick={() => props.history.push(`/productlist`)}
      >
        Go back
      </Button>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox
          status="error"
          description={error}
          title="There was an Error"
          reset={PRODUCT_VARIATION_RESET}
        ></MessageBox>
      ) : (
        <>
          <form onSubmit={submitHandler}>
            <Box m="5px">
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox
                  status="error"
                  description={errorUpdate}
                  title="There was an Error"
                  reset={PRODUCT_VARIATION_RESET}
                ></MessageBox>
              )}
              {loadingCreate && <LoadingBox></LoadingBox>}
              {errorCreate && (
                <MessageBox
                  status="error"
                  description={errorCreate}
                  title="There was an Error"
                  reset={PRODUCT_VARIATION_RESET}
                ></MessageBox>
              )}
              {successCreate && (
                <MessageBox
                  status="success"
                  description="New variation added successfully"
                  title="Success"
                  reset={PRODUCT_VARIATION_RESET}
                ></MessageBox>
              )}
            </Box>

            <Box m="rem" shadow="lg" p="1rem">
              <FormControl id="type">
                <FormLabel>Type</FormLabel>
                <Input
                  focusBorderColor="yellow.400"
                  placeholder="e.g size, color"
                  value={varType}
                  id="type"
                  color={"yellow.400"}
                  onChange={(e) => setVarType(e.target.value)}
                />
              </FormControl>
              <FormControl id="value">
                <FormLabel>Value</FormLabel>
                <Input
                  focusBorderColor="yellow.400"
                  placeholder="e.g red, XL"
                  value={value}
                  id="value"
                  color={"yellow.400"}
                  onChange={(e) => setValue(e.target.value)}
                />
              </FormControl>
              <FormControl id="value">
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  focusBorderColor="yellow.400"
                  placeholder="Quantity"
                  value={quantity}
                  id="value"
                  color={"yellow.400"}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </FormControl>

              <Button
                color="yellow.400"
                bg="blue.900"
                size="xs"
                my="5px"
                type="submit"
              >
                Save
              </Button>
            </Box>
          </form>
          {product && product.variation.length > 0 ? (
            product.variation.map((f, i) => (
              <Box m="1rem" shadow="lg" p="1rem" key={`${f.value}${i}`}>
                <Text>{f.varType}</Text>
                <Text>{f.value}</Text>
                <HStack>
                  <IconButton
                    variant="outline"
                    color="blue.900"
                    _hover={{ color: "yellow.400" }}
                    icon={<MinusIcon />}
                    size="xs"
                    onClick={(e) => qtyHandler(f._id, 0.3)}
                    isDisabled={f.quantity <= 1}
                  />

                  <FormControl w="30px">
                    <Input
                      type="number"
                      defaultValue={f.quantity}
                      size="xs"
                      onBlur={(e) => qtyHandler(f._id, e.target.value)}
                    ></Input>
                  </FormControl>
                  <IconButton
                    variant="outline"
                    color="blue.900"
                    _hover={{ color: "yellow.400" }}
                    icon={<AddIcon />}
                    size="xs"
                    onClick={(e) => qtyHandler(f._id, 0.5)}
                  />
                  <IconButton
                    variant="outline"
                    color="blue.900"
                    _hover={{ color: "yellow.400" }}
                    aria-label="Send email"
                    icon={<DeleteIcon />}
                    size="xs"
                    w="10px"
                    onClick={(e) => qtyHandler(f._id, 0.1)}
                  />
                </HStack>
              </Box>
            ))
          ) : (
            <Text>No Variation yet</Text>
          )}
        </>
      )}
    </Box>
  );
}
