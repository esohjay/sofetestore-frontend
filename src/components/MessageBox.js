import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
export default function MessageBox({ title, description, status, reset = {} }) {
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const disappear = setTimeout(() => {
      setActive(false);

      dispatch({ type: reset });
    }, 3000);
    return () => {
      clearTimeout(disappear);
    };
  }, [dispatch, reset]);
  return (
    <div id="overlay">
      <Center>
        <Box p="10px" m="10px" w="auto">
          {active && (
            <Alert status={status} variant="left-accent">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>{title}!</AlertTitle>
                <AlertDescription display="block">
                  {description}
                </AlertDescription>
              </Box>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setActive(false)}
              />
            </Alert>
          )}
        </Box>
      </Center>
    </div>
  );
}
/**<Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button> 
    
    
    
        <Box>
      {toast({
        title: { title },
        description: { description },
        status: { status },
        duration: 9000,
        isClosable: true,
      })}
    </Box>*/
