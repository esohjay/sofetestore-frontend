import React, { useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
//import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { HStack, Button, Center, IconButton } from "@chakra-ui/react";

export default function Pagination({
  pageInfo,
  pageHandler,
  handleNextbtn,
  handlePrevbtn,
}) {
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.totalPages; i++) {
      pages.push(i);
    }
  }
  const renderPageNumbers = pages.map((number) => {
    if (
      (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) ||
      pageInfo.page === number
    ) {
      return (
        <HStack key={number}>
          <Button
            size="xs"
            onClick={() => pageHandler(number)}
            border={number === pageInfo.page ? "solid" : ""}
            borderColor="blue.900"
            color={number === pageInfo.page ? "blue.900" : "yellow.400"}
            bg={number === pageInfo.page ? "yellow.400" : "blue.900"}
            mx="2px"
            borderWidth="thin"
          >
            {number}
          </Button>
        </HStack>
      );
    } else {
      return null;
    }
  });
  const pageIncrementBtn = () => {
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
  };

  const pageDecrementBtn = () => {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  };
  return (
    <>
      {pageInfo && pageInfo.totalPages > 1 && (
        <Center>
          {pageInfo.hasPrevPage && (
            <IconButton
              size="xs"
              color="yellow.400"
              bg="blue.900"
              mx="2px"
              onClick={handlePrevbtn}
              icon={<ChevronLeftIcon />}
            />
          )}
          {minPageNumberLimit >= 1 && (
            <Button
              size="xs"
              color="yellow.400"
              bg="blue.900"
              mx="2px"
              onClick={pageDecrementBtn}
            >
              ...
            </Button>
          )}

          {renderPageNumbers}

          {pages.length > maxPageNumberLimit && (
            <Button
              size="xs"
              color="yellow.400"
              bg="blue.900"
              mx="2px"
              onClick={pageIncrementBtn}
            >
              ...
            </Button>
          )}

          {pageInfo.hasNextPage && (
            <IconButton
              size="xs"
              color="yellow.400"
              bg="blue.900"
              mx="2px"
              onClick={handleNextbtn}
              icon={<ChevronRightIcon />}
            />
          )}
        </Center>
      )}
    </>
  );
}
