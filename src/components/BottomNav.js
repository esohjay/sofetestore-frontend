import React from "react";
import { signout } from "../actions/userActions";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  FaShoppingBasket,
  FaRegHeart,
  FaRegUserCircle,
  FaUserShield,
  FaUserTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
export default function BottomNav() {
  const wishlistDetails = useSelector((state) => state.wishlistDetails);
  const { items: wishlistItem } = wishlistDetails;
  const cartDetails = useSelector((state) => state.cartDetails);
  const { items } = cartDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <>
      <div className="navbar-fixed2">
        <Box
          bg={"blue.900"}
          color={"yellow.400"}
          fontWeight={"bold"}
          fontSize={"md"}
          px={4}
          w={"100%"}
        >
          <Flex
            h={"50px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
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

            <Box>
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
            </Box>

            {userInfo ? (
              <Box>
                <Menu>
                  <MenuButton
                    _hover={{
                      color: "yellow.300",
                    }}
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
              </Box>
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

            <Box>
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
            </Box>
          </Flex>
        </Box>
      </div>
    </>
  );
}
