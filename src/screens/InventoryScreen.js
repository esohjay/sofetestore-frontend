import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsInventory, deleteInventory } from "../actions/inventoryActions";
import { deleteSales, createSales } from "../actions/salesActions";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import ModalPanel from "../components/Modal";
import UpdateForm from "../screens/InventoryEditForm";
import EditSales from "../screens/EditSales";
import { INVENTORY_UPDATE_RESET } from "../constants/inventoryConstants";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { SALES_CREATE_RESET } from "../constants/salesConstants";
import { SALES_UPDATE_RESET } from "../constants/salesConstants";
import { SALES_DELETE_RESET } from "../constants/salesConstants";
import {
  Box,
  Input,
  Center,
  FormControl,
  Button,
  FormLabel,
  Text,
  Stack,
  Spacer,
  Image,
  Table,
  Tr,
  Tbody,
  Td,
  Radio,
  RadioGroup,
  Textarea,
  HStack,
  Flex,
  useMediaQuery,
  Grid,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
//import { INVENTORY_SALES_RESET } from "../constants/inventoryConstants";

export default function InventoryScreen(props) {
  const inventoryId = props.match.params.id;
  const [product, setProduct] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [form, setForm] = useState(false);

  const inventoryUpdate = useSelector((state) => state.inventoryUpdate);
  const { success: updated } = inventoryUpdate;
  const inventoryDetails = useSelector((state) => state.inventoryDetails);
  const { loading, success, inventory, products, sales, analysis } =
    inventoryDetails;
  const salesUpdate = useSelector((state) => state.salesUpdate);
  const { success: salesUpdateSuccess } = salesUpdate;
  const salesCreate = useSelector((state) => state.salesCreate);
  const { success: salesCreateSuccess } = salesCreate;
  const salesDelete = useSelector((state) => state.salesDelete);
  const { success: salesDeleteSuccess } = salesDelete;

  const inventoryDelete = useSelector((state) => state.inventoryDelete);
  const { success: successDelete } = inventoryDelete;
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsInventory(inventoryId));

    if (successDelete) {
      props.history.push("/inventories");
    }
    if (salesCreateSuccess) {
      setForm(false);
      setProduct("");
      setQuantity("");
      setPrice("");
      setDescription("");
      setDate("");
      setCustomerName("");
      setCustomerPhone("");
    }
  }, [
    dispatch,
    inventoryId,
    salesCreateSuccess,
    updated,
    successDelete,
    props.history,
    salesDeleteSuccess,
    salesUpdateSuccess,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createSales({
        product,
        quantity,
        price,
        id: inventoryId,
        size,
        batch: inventory.batch,
        description,
        date,
        customerPhone,
        customerName,
      })
    );
  };
  const PickProduct = () => {
    return (
      <Box>
        {products && products.length > 0 && (
          <FormControl id="region" isRequired>
            <RadioGroup value={`${product._id}`}>
              {products.map((item) => (
                <div key={item._id}>
                  <Stack direction="row" my="5px">
                    <Radio
                      colorScheme="green"
                      value={item._id}
                      onChange={() => selectProductHandler(item)}
                    ></Radio>
                    <Box h="50px" w="50px" mx="8px">
                      <Image
                        boxSize="full"
                        objectFit="cover"
                        src={item.images[0].url}
                        alt={item.name}
                        objectPosition="center center"
                        cursor="pointer"
                      />
                    </Box>
                    <Text>{item.name}</Text>
                  </Stack>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </Box>
    );
  };
  const deleteHandler = (id) => {
    dispatch(deleteInventory(id));
  };
  const deleteSalesHandler = (id) => {
    dispatch(deleteSales(id));
  };
  const selectProductHandler = (item) => {
    setProduct(item);
  };

  return (
    <Box m="20px">
      <Button
        color="blue.900"
        size={isLargerThan676 ? "md" : "sm"}
        backgroundColor="yellow.400"
        _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
      >
        <Link to="/inventories">All Batches</Link>
      </Button>
      {loading && <LoadingBox></LoadingBox>}
      {salesCreateSuccess && (
        <MessageBox
          status="success"
          description="Sales added successfully"
          title="Success"
          reset={SALES_CREATE_RESET}
        ></MessageBox>
      )}
      {salesUpdateSuccess && (
        <MessageBox
          status="success"
          description="Sales updated successfully"
          title="Success"
          reset={SALES_UPDATE_RESET}
        ></MessageBox>
      )}
      {salesDeleteSuccess && (
        <MessageBox
          status="success"
          description="Sales deleted successfully"
          title="Success"
          reset={SALES_DELETE_RESET}
        ></MessageBox>
      )}
      {updated && (
        <MessageBox
          status="success"
          description="Batch updated successfully"
          title="Updated"
          reset={INVENTORY_UPDATE_RESET}
        ></MessageBox>
      )}
      {success && (
        <Box m="50px">
          <Text
            color="blue.900"
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
          >
            {inventory.batch}
          </Text>
          <Box mx={{ base: "10%", md: "15%" }} py="2rem">
            <Table variant="simple" shadow="lg" bg="white">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Batch
                  </Td>
                  <Td color="blue.900">{inventory.batch}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Source
                  </Td>
                  <Td color="blue.900">{inventory.origin}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Date
                  </Td>
                  <Td color="blue.900">{inventory.date.substring(0, 10)}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Quantity Bought
                  </Td>
                  <Td color="blue.900">{inventory.quantity}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Quantity Sold
                  </Td>
                  <Td color="blue.900">{analysis.qtySold}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Qty in Stock
                  </Td>
                  <Td color="blue.900">{analysis.remProduct}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Amount Spent
                  </Td>
                  <Td color="blue.900" fontWeight="bold">
                    ₦{inventory.cost}
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Anount Earned
                  </Td>
                  <Td
                    color={
                      inventory.cost > analysis.totalPrice
                        ? "orange.900"
                        : "green"
                    }
                    fontWeight="bold"
                  >
                    ₦{analysis.totalPrice}
                  </Td>
                </Tr>
                <Tr>
                  <Td color="blue.900" fontWeight="bold">
                    Net Profit
                  </Td>
                  <Td
                    color={
                      inventory.cost > analysis.totalPrice ? "red" : "green"
                    }
                    fontWeight="bold"
                  >
                    ₦{analysis.netProfit}
                  </Td>
                </Tr>
                <Tr>
                  <Td color="blue.900" fontWeight="bold">
                    Description
                  </Td>
                  <Td color="blue.900"> {inventory.description}</Td>
                </Tr>
                <Tr>
                  <Td color="blue.900" fontWeight="bold">
                    <HStack>
                      <ModalPanel
                        content={<UpdateForm inventory={inventory} />}
                        title="Edit Batch"
                        variant={<EditIcon />}
                      />
                      <Alert
                        text={`Delete ${inventory.batch}?`}
                        description={
                          "Are you sure? You can't undo this action afterwards."
                        }
                        click={() => deleteHandler(inventory._id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}

      {sales && sales.length > 0 && (
        <Box
          mx={{ base: "10%", md: "15%" }}
          my="20px"
          p="1rem"
          shadow="xl"
          backgroundColor="white"
        >
          {isLargerThan676 && (
            <SimpleGrid
              columns={[3, null, 7]}
              spacing="40px"
              borderBottom="solid"
              borderBottomColor="blue.900"
              borderBottomWidth="0.5px"
              my="1rem"
              py="1rem"
            >
              <Box></Box>
              <Box>
                <Text>Product Name</Text>
              </Box>
              <Box>
                <Text>Qty</Text>
              </Box>
              <Box>
                <Text>Date</Text>
              </Box>
              <Box>
                <Text>Price</Text>
              </Box>
              <Box>
                <Text>Customer Info</Text>
              </Box>
              <Box></Box>
            </SimpleGrid>
          )}
          <Stack direction="column">
            {sales.map((sale) => (
              <div key={sale._id}>
                {isLargerThan676 && (
                  <SimpleGrid
                    columns={[3, null, 7]}
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
                        src={sale.img}
                        alt={sale.name}
                        objectPosition="center center"
                        cursor="pointer"
                      />
                    </Box>
                    <HStack color="blue.900" _hover={{ color: "yellow.400" }}>
                      <Link to={`/sale/${sale._id}`}>{sale.name}</Link>
                    </HStack>
                    <HStack>
                      <Text color="blue.900">{sale.quantity}</Text>
                    </HStack>
                    <HStack>
                      <Text color="blue.900">{sale.date.substring(0, 10)}</Text>
                    </HStack>

                    <HStack>
                      <Text color="blue.900">₦{sale.price}</Text>
                    </HStack>
                    <HStack>
                      {sale.customerPhone && (
                        <Stack direction="column">
                          <Text color="blue.900">{sale.customerName}</Text>
                          <Text color="blue.900">({sale.customerPhone})</Text>
                        </Stack>
                      )}
                    </HStack>
                    <HStack>
                      <HStack>
                        <ModalPanel
                          content={<EditSales sales={sale} />}
                          title="Edit Batch"
                          variant={<EditIcon />}
                        />
                        <Alert
                          text={`Delete ${sale.name}?`}
                          description={
                            "Are you sure? You can't undo this action afterwards."
                          }
                          click={() => deleteSalesHandler(sale._id)}
                        />
                      </HStack>
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
                                src={sale.img}
                                alt={sale.name}
                                objectPosition="center center"
                                cursor="pointer"
                              />
                            </Box>
                          </GridItem>
                          <GridItem colSpan={4}>
                            <Stack direction="column" spacing="1px">
                              <Text color="blue.900">{sale.name}</Text>
                              <Text color="blue.900">{sale.quantity}</Text>
                              <Text color="blue.900">
                                {sale.date.substring(0, 10)}
                              </Text>
                              <Text color="blue.900">₦{sale.price}</Text>
                            </Stack>
                          </GridItem>
                        </Grid>
                      </Box>
                      <Box>
                        <Flex>
                          <ModalPanel
                            content={<EditSales sales={sale} />}
                            title="Edit Sales"
                            variant={<EditIcon />}
                          />
                          <Alert
                            text={`Delete ${sale.name}?`}
                            description={
                              "Are you sure? You can't undo this action afterwards."
                            }
                            click={() => deleteSalesHandler(sale._id)}
                          />
                          <Spacer />
                          <HStack>
                            {sale.customerPhone && (
                              <Text color="blue.900">
                                {sale.customerName}({sale.customerPhone})
                              </Text>
                            )}
                          </HStack>
                        </Flex>
                      </Box>
                    </Stack>
                  </Box>
                )}
              </div>
            ))}
          </Stack>
        </Box>
      )}
      <Center>
        <Button
          color="yellow.400"
          backgroundColor="blue.900"
          _hover={{ color: "blue.900", backgroundColor: "yellow.400" }}
          size="sm"
          onClick={() => setForm(!form)}
        >
          Add Sales
        </Button>
      </Center>
      {form && (
        <Box
          mx={{ base: "10%", md: "20%" }}
          my="20px"
          p="1rem"
          shadow="xl"
          backgroundColor="white"
        >
          <HStack>
            <Text>Select Product</Text>
            <ModalPanel
              content={<PickProduct />}
              title="Select Product"
              footer="yes"
              variant={<AddIcon />}
            />
          </HStack>
          <form onSubmit={submitHandler}>
            <Stack direction="column">
              {product && (
                <HStack my="5px">
                  <Box h="50px" w="50px" mx="8px">
                    <Image
                      boxSize="full"
                      objectFit="cover"
                      src={product.images[0].url}
                      alt={product.name}
                      objectPosition="center center"
                      cursor="pointer"
                    />
                  </Box>
                  <Text>{product.name}</Text>
                </HStack>
              )}

              <FormControl id="quantity" isRequired>
                <FormLabel color="blue.900">Quantity Sold</FormLabel>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="size" isRequired>
                <FormLabel color="blue.900">Size</FormLabel>
                <RadioGroup>
                  <Stack spacing={4} direction="row">
                    {product &&
                      product.variation.map((vary) => (
                        <Radio
                          value={`${vary.value}`}
                          onChange={(e) => setSize(e.target.value)}
                        >
                          {vary.value}
                        </Radio>
                      ))}
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel color="blue.900">Price</FormLabel>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="date" isRequired>
                <FormLabel color="blue.900">Date</FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="customerName" isRequired>
                <FormLabel color="blue.900">Customer Name</FormLabel>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="customerPhone">
                <FormLabel color="blue.900">Customer Phone</FormLabel>
                <Input
                  type="number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel color="blue.900">Description</FormLabel>
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  color="blue.700"
                />
              </FormControl>
              <Button
                type="submit"
                color="yellow.400"
                backgroundColor="blue.900"
                _hover={{ color: "blue.900", backgroundColor: "yellow.400" }}
                size="sm"
                isDisabled={!product}
              >
                Continue
              </Button>
            </Stack>
          </form>
        </Box>
      )}
    </Box>
  );
}
