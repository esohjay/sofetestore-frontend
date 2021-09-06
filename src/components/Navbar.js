import React, { useState, useEffect } from "react";
//import { Link as ReachLink } from "@reach/router";
import { Link, Route } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  Divider,
  Portal,
  Text,
} from "@chakra-ui/react";
import SearchBox from "../components/SearchBox";
import DrawerComponent from "../components/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
//import { listProducts } from "../actions/productActions";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  FaShoppingBasket,
  FaRegHeart,
  FaRegUserCircle,
  FaUserShield,
  FaUserTimes,
} from "react-icons/fa";
import { Icon } from "@chakra-ui/react";

import { detailsCart } from "../actions/cartActions";

import { detailsWishlist } from "../actions/wishlistActions";
export default function Navbar({ float }) {
  const [show, setShow] = useState(false);
  // const productList = useSelector((state) => state.productList);
  const cartCreate = useSelector((state) => state.cartCreate);
  const { success: successCartCreate } = cartCreate;
  const cartDetails = useSelector((state) => state.cartDetails);
  const { items } = cartDetails;
  const wishlistDetails = useSelector((state) => state.wishlistDetails);
  const { items: wishlistItem } = wishlistDetails;
  const wishlistCreate = useSelector((state) => state.wishlistCreate);
  const { success: successWishlistCreate } = wishlistCreate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // const { loading, error, products } = productList;
  // let categories = [];
  const dispatch = useDispatch();
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");
  const drawerItems = [
    { to: "/shop", text: "Shop" },
    { to: "/categories", text: "Categories" },
    { to: "/contact", text: "Contact" },
  ];
  useEffect(() => {
    dispatch(detailsCart());
    dispatch(detailsWishlist());
    //dispatch({ type: CART_CREATE_RESET });
  }, [dispatch, successCartCreate, successWishlistCreate]);
  const handleSearchBar = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <>
      <div className={`${float}`}>
        <Box
          bg={"blue.900"}
          color={"yellow.400"}
          fontWeight={"bold"}
          fontSize={"md"}
          px={4}
          w={"100%"}
          zIndex="4"
        >
          <Flex
            h={"50px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
          >
            {!isLargerThan676 && <DrawerComponent links={drawerItems} />}
            <Link to={"/"}>
              <Box
                _hover={{
                  color: "yellow.300",
                }}
                fontSize={"xl"}
              >
                Sofete Store
              </Box>
            </Link>

            <HStack
              spacing={8}
              alignItems={"center"}
              display={{ base: "none", md: "flex" }}
            >
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {drawerItems.map((item, i) => (
                  <Link to={item.to} key={i}>
                    <Text
                      _hover={{
                        color: "yellow.300",
                      }}
                    >
                      {item.text}
                    </Text>
                  </Link>
                ))}
                <Menu>
                  <MenuButton>Open menu</MenuButton>
                  <Portal>
                    <MenuList>
                      <MenuItem>Menu 1</MenuItem>
                      <MenuItem>New Window</MenuItem>
                      <MenuItem>Open Closed Tab</MenuItem>
                      <MenuItem>Open File</MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </HStack>
            </HStack>

            <Flex alignItems={"center"}>
              <HStack as={"nav"} spacing={4}>
                <Box
                  _hover={{
                    color: "yellow.300",
                  }}
                >
                  <Link to="/cart">
                    <Icon as={FaShoppingBasket} />
                    {items && items.length > 0 && (
                      <span className="badge">{items.length}</span>
                    )}
                  </Link>
                </Box>
                {isLargerThan676 && (
                  <HStack>
                    <Box
                      _hover={{
                        color: "yellow.300",
                      }}
                    >
                      <Link to="/wishlist">
                        <Icon as={FaRegHeart} />
                        {wishlistItem && wishlistItem.length > 0 && (
                          <span className="badge">{wishlistItem.length}</span>
                        )}
                      </Link>
                    </Box>
                    {userInfo ? (
                      <Menu>
                        <MenuButton
                          _hover={{
                            color: "yellow.300",
                          }}
                          rightIcon={<ChevronDownIcon />}
                        >
                          <Icon as={FaRegUserCircle} />
                        </MenuButton>
                        <MenuList bg={"blue.900"}>
                          <Link to="/profile">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                              _focus={{ bg: "yellow.300", color: "blue.900" }}
                            >
                              Profile
                            </MenuItem>
                          </Link>
                          <Link to="/orderhistory">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                            >
                              Orders
                            </MenuItem>
                          </Link>

                          <Link to="#signout">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                              onClick={signoutHandler}
                            >
                              Sign Out
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </Menu>
                    ) : (
                      <Box
                        _hover={{
                          color: "yellow.300",
                        }}
                      >
                        <Link to="/signin">
                          <Icon as={FaUserTimes}></Icon>
                        </Link>
                      </Box>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <Menu>
                        <MenuButton
                          _hover={{
                            color: "yellow.300",
                          }}
                        >
                          <Icon as={FaUserShield} />
                        </MenuButton>
                        <MenuList bg={"blue.900"}>
                          <Link to="/dashboard">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                              _focus={{ bg: "yellow.300", color: "blue.900" }}
                            >
                              Dashboard
                            </MenuItem>
                          </Link>
                          <Link to="/addproduct">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                            >
                              Add Product
                            </MenuItem>
                          </Link>
                          <Link to="/productlist">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                            >
                              Products
                            </MenuItem>
                          </Link>
                          <Link to="/orderlist">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                            >
                              Orders
                            </MenuItem>
                          </Link>
                          <Link to="/userlist">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                            >
                              Users
                            </MenuItem>
                          </Link>
                          <Link to="/findwishlist">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                            >
                              Wishlist
                            </MenuItem>
                          </Link>
                          <Link to="/inventories">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                            >
                              Product Batches
                            </MenuItem>
                          </Link>
                          <Link to="/sales">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                            >
                              Sales
                            </MenuItem>
                          </Link>
                          <Link to="/message">
                            <MenuItem
                              _hover={{
                                bg: "yellow.300",
                                color: "blue.900",
                              }}
                            >
                              Message
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </Menu>
                    )}
                  </HStack>
                )}
                <Divider orientation="vertical" h="30px" />
                <IconButton
                  aria-label="Search database"
                  bg={"blue.900"}
                  isRound
                  _hover={{
                    bg: "blue.900",
                  }}
                  _focus={{
                    bg: "blue.900",
                  }}
                  icon={
                    <SearchIcon
                      color={"yellow.400"}
                      _hover={{
                        color: "yellow.300",
                      }}
                    />
                  }
                  onClick={handleSearchBar}
                />
              </HStack>
            </Flex>
          </Flex>
          {show && (
            <Box zIndex={5}>
              <Route
                render={({ history }) => (
                  <SearchBox history={history}></SearchBox>
                )}
              ></Route>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}
