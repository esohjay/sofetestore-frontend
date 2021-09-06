import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteSales, detailsSales } from "../actions/salesActions";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import ModalPanel from "../components/Modal";

import EditSales from "../screens/EditSales";

import { SALES_UPDATE_RESET } from "../constants/salesConstants";
import { SALES_DELETE_RESET } from "../constants/salesConstants";
import {
  Box,
  Center,
  Image,
  Table,
  Tr,
  Tbody,
  Td,
  HStack,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
//import { INVENTORY_SALES_RESET } from "../constants/inventoryConstants";

export default function SalesScreen(props) {
  const salesId = props.match.params.id;

  const salesUpdate = useSelector((state) => state.salesUpdate);
  const { success: updated } = salesUpdate;
  const salesDetails = useSelector((state) => state.salesDetails);
  const { loading, success, sales } = salesDetails;

  const salesDelete = useSelector((state) => state.salesDelete);
  const { success: salesDeleteSuccess } = salesDelete;
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsSales(salesId));

    if (salesDeleteSuccess) {
      props.history.push("/sales");
    }
  }, [dispatch, salesId, updated, salesDeleteSuccess, props.history]);

  const deleteSalesHandler = (id) => {
    dispatch(deleteSales(id));
  };

  return (
    <Box m="20px">
      <Button
        color="blue.900"
        size={isLargerThan676 ? "md" : "sm"}
        backgroundColor="yellow.400"
        _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
        m="20px"
      >
        <Link to="/sales">All Sales</Link>
      </Button>
      {loading && <LoadingBox></LoadingBox>}

      {updated && (
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

      {success && (
        <Box m="50px">
          <Center>
            <Box h="150px" w="150px">
              <Image
                boxSize="full"
                objectFit="cover"
                src={sales.img}
                alt={sales.name}
                objectPosition="center center"
                cursor="pointer"
              />
            </Box>
          </Center>
          <Box mx={{ base: "10%", md: "15%" }} py="2rem">
            <Table variant="simple" shadow="lg" bg="white">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Name
                  </Td>
                  <Td color="blue.900">{sales.name}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Batch
                  </Td>
                  <Td color="blue.900">{sales.batch}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Date
                  </Td>
                  <Td color="blue.900">{sales.date.substring(0, 10)}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Quantity
                  </Td>
                  <Td color="blue.900">{sales.quantity}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Size
                  </Td>
                  <Td color="blue.900">{sales.size}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Price
                  </Td>
                  <Td color="blue.900">₦{sales.price}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Customer Name
                  </Td>
                  <Td color="blue.900">{sales.customerName}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.900">
                    Customer Phone
                  </Td>
                  <Td color="blue.900">{sales.customerPhone}</Td>
                </Tr>
                <Tr>
                  <Td color="blue.900" fontWeight="bold">
                    Description
                  </Td>
                  <Td color="blue.900"> {sales.description}</Td>
                </Tr>

                <Tr>
                  <Td color="blue.900" fontWeight="bold">
                    <HStack>
                      <ModalPanel
                        content={<EditSales sales={sales} />}
                        title="Edit Batch"
                      />
                      <Alert
                        text={`Delete ${sales.name}?`}
                        description={
                          "Are you sure? You can't undo this action afterwards."
                        }
                        click={() => deleteSalesHandler(sales._id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}
    </Box>
  );
}
