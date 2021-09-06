import React, { useState } from "react";
import { Center, Box, Input, IconButton, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <Center bg={"blue.900"} p={3}>
      <Box w={"65%"}>
        <form className="search" onSubmit={submitHandler}>
          <HStack
            h={"40px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Input
              focusBorderColor="yellow.400"
              placeholder="Search"
              color={"yellow.400"}
              onChange={(e) => setName(e.target.value)}
            />

            <IconButton
              aria-label="Search database"
              bg={"yellow.400"}
              type="submit"
              _hover={{ bg: "yellow.400" }}
              icon={<SearchIcon color={"blue.900"} />}
            />
          </HStack>
        </form>
      </Box>
    </Center>
  );
}
