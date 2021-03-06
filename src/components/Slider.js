import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";
import data from "../data";
export default function Slider(props) {
  // const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = data.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <>
      <Box>
        <Box
          pos="relative"
          overflow="hidden"
          display="flex"
          h={{ base: "300px", md: "400px", lg: "500" }}
          m={0}
          textAlign="center"
        >
          {data.map((slide, personIndex) => {
            let position = "nextSlide";
            if (personIndex === index) {
              position = "activeSlide";
            }
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === data.length - 1)
            ) {
              position = "lastSlide";
            }

            return (
              <article className={position} key={slide.id}>
                <Box
                  bgImage={`url('${slide.url}')`}
                  backgroundSize={"cover"}
                  backgroundPosition={"center center"}
                  bgRepeat="no-repeat"
                  textAlign="center"
                  justify="center"
                >
                  <Stack
                    as={Box}
                    textAlign={"center"}
                    p={{ base: 20, md: 40 }}
                    bgGradient={
                      "linear(to-r, blackAlpha.600, blackAlpha.600,  )"
                    }
                  >
                    <Heading
                      fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                      lineHeight={"110%"}
                      color="yellow.400"
                      fontWeight="extrabold"
                      //bgGradient={"linear(to-r,white,  blue.900,yellow.400,)"}
                      //bgClip="text"
                    >
                      <div style={{ fontFamily: "courier" }}>{slide.text}</div>
                    </Heading>
                    <Text
                      color="white"
                      fontSize={{ base: "md", sm: "lg", md: "2xl" }}
                    >
                      <div style={{ fontFamily: "Verdana" }}>
                        {slide.caption}
                      </div>
                    </Text>
                    <Stack
                      direction={"column"}
                      spacing={3}
                      align={"center"}
                      alignSelf={"center"}
                      position={"relative"}
                    >
                      <Link to="/shop">
                        <Button
                          color="blue.900"
                          backgroundColor="yellow.400"
                          _hover={{
                            color: "yellow.400",
                            backgroundColor: "blue.900",
                          }}
                          px={6}
                        >
                          {slide.btn}
                        </Button>
                      </Link>
                    </Stack>
                  </Stack>
                </Box>
              </article>
            );
          })}
          <button className="prev" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
          </button>
        </Box>
      </Box>
    </>
  );
}
