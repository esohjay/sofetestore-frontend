import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allInventory, deleteInventory } from "../actions/inventoryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Alert from "../components/Alert";
import ModalPanel from "../components/Modal";
import UpdateForm from "../screens/InventoryEditForm";
import { Link } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  HStack,
  Button,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { INVENTORY_DELETE_RESET } from "../constants/inventoryConstants";
import { INVENTORY_UPDATE_RESET } from "../constants/inventoryConstants";

export default function InventoryListScreen(props) {
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const inventoryList = useSelector((state) => state.inventoryList);
  const { loading, error, inventory } = inventoryList;
  const inventoryUpdate = useSelector((state) => state.inventoryUpdate);
  const { success } = inventoryUpdate;
  const inventoryDelete = useSelector((state) => state.inventoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = inventoryDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allInventory());
  }, [dispatch, successDelete, success]);
  const deleteHandler = (id) => {
    dispatch(deleteInventory(id));
  };
  return (
    <Box m="20px">
      <Button
        color="blue.900"
        size={isLargerThan676 ? "md" : "sm"}
        backgroundColor="yellow.400"
        _hover={{ color: "yellow.400", backgroundColor: "blue.900" }}
      >
        <Link to="/addinventory">Add Batch</Link>
      </Button>
      <Text
        textAlign="center"
        m="1rem"
        color="blue.900"
        fontWeight="bold"
        fontSize={{ base: "2xl", md: "4xl" }}
      >
        Batches
      </Text>
      {inventory && inventory.length > 0 && (
        <Text textAlign="center" m="0.5rem" color="blue.900">
          ( {inventory.length} batches)
        </Text>
      )}
      {loadingDelete && <LoadingBox size="md"></LoadingBox>}
      {errorDelete && (
        <MessageBox
          status="error"
          description={errorDelete}
          title="Oops"
        ></MessageBox>
      )}
      {successDelete && (
        <MessageBox
          status="success"
          description="Batch deleted successfully"
          title="Deleted"
          reset={INVENTORY_DELETE_RESET}
        ></MessageBox>
      )}
      {successDelete && (
        <MessageBox
          status="success"
          description="Batch updated successfully"
          title="Updated"
          reset={INVENTORY_UPDATE_RESET}
        ></MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox
          status="error"
          description={error}
          title="Oops"
        ></MessageBox>
      ) : (
        <Table size="sm">
          <Thead>
            <Tr color="blue.900">
              <Th>Batch Name</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {inventory.map((item) => (
              <Tr key={item._id}>
                <Td>
                  <Link to={`/inventorylist/${item._id}`}>{item.batch}</Link>
                </Td>
                <Td>{item.date.substring(0, 10)}</Td>
                <Td>
                  <HStack>
                    <ModalPanel
                      content={<UpdateForm inventory={item} />}
                      title="Edit Batch"
                    />
                    <Alert
                      text={`Delete ${item.batch}?`}
                      description={
                        "Are you sure? You can't undo this action afterwards."
                      }
                      click={() => deleteHandler(item._id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
