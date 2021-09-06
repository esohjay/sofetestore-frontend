import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Alert from "../components/Alert";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { USER_DELETE_RESET } from "../constants/userConstants";
export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    dispatch(deleteUser(user._id));
  };
  return (
    <Box m="20px">
      <Text
        textAlign="center"
        m="1rem"
        color="blue.900"
        fontWeight="bold"
        fontSize={{ base: "2xl", md: "4xl" }}
      >
        Users
      </Text>
      {users && users.length > 0 && (
        <Text textAlign="center" m="0.5rem" color="blue.900">
          ( {users.length} users)
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
          description="User deleted successfully"
          title="Deleted"
          reset={USER_DELETE_RESET}
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
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <HStack>
                    <IconButton
                      variant="outline"
                      color="blue.900"
                      _hover={{ color: "yellow.400" }}
                      icon={<EditIcon />}
                      size="xs"
                      onClick={() =>
                        props.history.push(`/user/${user._id}/edit`)
                      }
                    />
                    <Alert
                      text={`Delete ${user.name}?`}
                      description={
                        "Are you sure? You can't undo this action afterwards."
                      }
                      click={() => deleteHandler(user)}
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
