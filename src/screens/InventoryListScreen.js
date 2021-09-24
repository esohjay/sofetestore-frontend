import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allInventory, deleteInventory } from "../actions/inventoryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Alert from "../components/Alert";
import ModalPanel from "../components/Modal";
import UpdateForm from "../screens/InventoryEditForm";
import { Link } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
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
  Stack,
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
import { INVENTORY_DELETE_RESET } from "../constants/inventoryConstants";
import { INVENTORY_UPDATE_RESET } from "../constants/inventoryConstants";
const Filter = () => {
  const [batch, setBatch] = useState("");
  const [origin, setOrigin] = useState("");
  const [costMin, setCostMin] = useState("");
  const [costMax, setCostMax] = useState("");
  const [dateMin, setDateMin] = useState("");
  const [dateMax, setDateMax] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(
      allInventory({
        batch,
        costMin,
        costMax,
        dateMin,
        dateMax,
        origin,
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
          <FormControl id="origin" h={"100px"} w={"200px"}>
            <FormLabel>Origin</FormLabel>
            <Input
              focusBorderColor="yellow.400"
              placeholder="Origin"
              value={origin}
              color={"yellow.400"}
              onChange={(e) => setOrigin(e.target.value)}
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
                        value={costMin}
                        onChange={(e) => setCostMin(e.target.value)}
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
                        value={costMax}
                        onChange={(e) => setCostMax(e.target.value)}
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
    dispatch(allInventory({}));
    dispatch({ type: INVENTORY_DELETE_RESET });
    dispatch({ type: INVENTORY_UPDATE_RESET });
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
                      variant={<EditIcon />}
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
