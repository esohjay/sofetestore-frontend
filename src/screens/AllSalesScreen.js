import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSales, allSales } from "../actions/salesActions";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import ModalPanel from "../components/Modal";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import EditSales from "../screens/EditSales";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  HStack,
  Stack,
  Spacer,
  SimpleGrid,
  Image,
  Grid,
  GridItem,
  Button,
  useMediaQuery,
  Flex,
  FormControl,
  Input,
  FormLabel,
  Wrap,
  WrapItem,
  NumberInput,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  Center,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { SALES_UPDATE_RESET } from "../constants/salesConstants";
import { SALES_DELETE_RESET } from "../constants/salesConstants";

const Filter = () => {
  const [batch, setBatch] = useState("");
  const [nameSku, setNameSku] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [dateMin, setDateMin] = useState("");
  const [dateMax, setDateMax] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(
      allSales({
        batch,
        priceMin,
        priceMax,
        dateMin,
        dateMax,
        nameSku,
      })
    );
  };

  return (
    <Box pb={4}>
      <Stack as={"nav"} spacing={4}>
        <form className="form" onSubmit={submitHandler}>
          <FormControl id="batch" h={"100px"} w={"200px"}>
            <FormLabel>Batch</FormLabel>
            <Input
              focusBorderColor="yellow.400"
              placeholder="Batch"
              value={batch}
              color={"yellow.400"}
              onChange={(e) => setBatch(e.target.value)}
            />
          </FormControl>
          <FormControl id="name" h={"100px"} w={"200px"}>
            <FormLabel>Product Name</FormLabel>
            <Input
              focusBorderColor="yellow.400"
              placeholder="Product name/Sku"
              value={nameSku}
              color={"yellow.400"}
              onChange={(e) => setNameSku(e.target.value)}
            />
          </FormControl>
          <Wrap>
            <WrapItem>
              <Center>
                <Box>
                  <FormControl id="cost" h={"100px"} w={"100px"}>
                    <FormLabel>From(₦)</FormLabel>
                    <NumberInput min={0} step={500}>
                      <NumberInputField
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Box>
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <Box>
                  <FormControl id="cost" h={"100px"} w={"100px"}>
                    <FormLabel>To(₦)</FormLabel>
                    <NumberInput min={0} step={500}>
                      <NumberInputField
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Box>
              </Center>
            </WrapItem>
          </Wrap>
          <Wrap>
            <WrapItem>
              <Center>
                <Box>
                  <FormControl id="date" h={"100px"} w={"100px"}>
                    <FormLabel>From</FormLabel>
                    <Input
                      value={dateMin}
                      onChange={(e) => setDateMin(e.target.value)}
                      type="date"
                      focusBorderColor="yellow.400"
                      color={"blue.900"}
                    />
                  </FormControl>
                </Box>
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <Box>
                  <FormControl id="date" h={"100px"} w={"100px"}>
                    <FormLabel>To</FormLabel>
                    <Input
                      value={dateMax}
                      onChange={(e) => setDateMax(e.target.value)}
                      type="date"
                      focusBorderColor="yellow.400"
                      color={"blue.900"}
                    />
                  </FormControl>
                </Box>
              </Center>
            </WrapItem>
          </Wrap>

          <HStack>
            <Button
              variant="outline"
              color="yellow.400"
              borderColor
              size="sm"
              type="submit"
            >
              Filter
            </Button>
          </HStack>
        </form>
      </Stack>
    </Box>
  );
};

export default function AllSalesScreen() {
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const salesDelete = useSelector((state) => state.salesDelete);
  const { success: salesDeleteSuccess } = salesDelete;
  const salesList = useSelector((state) => state.salesList);
  const { loading, error, sales, sale } = salesList;
  const salesUpdate = useSelector((state) => state.salesUpdate);
  const { success: salesUpdateSuccess } = salesUpdate;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allSales({}));
    dispatch({ type: SALES_UPDATE_RESET });
    dispatch({ type: SALES_DELETE_RESET });
  }, [dispatch, salesUpdateSuccess, salesDeleteSuccess]);
  const deleteSalesHandler = (id) => {
    dispatch(deleteSales(id));
  };

  const pageHandler = (page) => {
    dispatch(
      allSales({
        page,
      })
    );
  };
  const handleNextbtn = () => {
    dispatch(
      allSales({
        page: sale.page + 1,
      })
    );

    if (sale.page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    dispatch(
      allSales({
        page: sale.page - 1,
      })
    );

    if ((sale.page - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  return (
    <Box>
      <Box m="20px" p="1rem">
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
        <Button
          color="blue.900"
          size={isLargerThan676 ? "md" : "sm"}
          backgroundColor="yellow.400"
          _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
        >
          <Link to="/addsales">Add Sales</Link>
        </Button>
        <Text
          textAlign="center"
          m="1rem"
          color="blue.900"
          fontWeight="bold"
          fontSize={{ base: "2xl", md: "4xl" }}
        >
          Sales
        </Text>
        {sales && sales.length > 0 && (
          <Text textAlign="center" m="0.5rem" color="blue.900">
            ( {sale.totalDocs} sales)
          </Text>
        )}
        <Center>
          <HStack>
            <ModalPanel
              content={<Filter />}
              title="Filter"
              footer="yes"
              variant={<FaFilter />}
            />
            <Text>Filter</Text>
          </HStack>
        </Center>
        {loading ? (
          <LoadingBox size="md"></LoadingBox>
        ) : error ? (
          <MessageBox
            status="error"
            description={error}
            title="Oops"
          ></MessageBox>
        ) : (
          <Box
            my="20px"
            p="1rem"
            shadow={{ md: "xl" }}
            backgroundColor={{ md: "white" }}
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
                        <Text color="blue.900">
                          {sale.date.substring(0, 10)}
                        </Text>
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
                        bg="white"
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
            <Pagination
              pageInfo={sale}
              pageHandler={pageHandler}
              handleNextbtn={handleNextbtn}
              handlePrevbtn={handlePrevbtn}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
