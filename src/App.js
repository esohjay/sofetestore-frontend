import React, { useEffect, useState } from "react";

import { BrowserRouter, Route } from "react-router-dom";

//import { detailsCart } from "./actions/cartActions";
import CartScreen from "./screens/CartScreen";
import TrackOrderScreen from "./screens/TrackOrderScreen";
import WishlistScreen from "./screens/WishlistScreen";
import FindWishlistScreen from "./screens/FindWishlistScreen";
import { Box, useMediaQuery } from "@chakra-ui/react";
import HomeScreen from "./screens/HomeScreen";
import VariationScreen from "./screens/Variation";
import ShippingMethodScreen from "./screens/ShippingMethodScreen";
import AllSalesScreen from "./screens/AllSalesScreen";
import SalesFormScreen from "./screens/SalesFormScreen";
import ManageImageScreen from "./screens/manageImageScreen";
import PlaceOrder from "./screens/PlaceOrder";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import TopNav from "./components/TopNav";
import ProductScreen from "./screens/ProductScreen";
import ContactScreen from "./screens/ContactScreen";
import CreateProductScreen from "./screens/CreateProductScreen";
import UpdateProductScreen from "./screens/UpdateProductScreen";
import InventoryFormScreen from "./screens/InventoryFormScreen";
import InventoryScreen from "./screens/InventoryScreen";
import InventoryListScreen from "./screens/InventoryListScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import SigninScreen from "./screens/SigninScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SalesScreen from "./screens/SalesScreen";
import SearchScreen from "./screens/SearchScreen";
import AllProductsScreen from "./screens/AllProductsScreen";
import DashboardScreen from "./screens/DashboardScreen";
import BulkMailScreen from "./screens/BulkMailScreen";

function App() {
  const [nav, setNav] = useState("");
  const [isLargerThan676] = useMediaQuery("(min-width: 676px)");

  const handleScroll = () => {
    if (window.pageYOffset > 80) {
      setNav("navbar-fixed");
    } else {
      setNav("");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <BrowserRouter>
      <Box>
        <Box minH={"100vh"}>
          <TopNav />
          <Navbar float={nav} />

          <Route path="/product/:id" component={ProductScreen}></Route>
          <AdminRoute
            path="/manageimage/:id"
            component={ManageImageScreen}
          ></AdminRoute>
          <AdminRoute path="/sale/:id" component={SalesScreen}></AdminRoute>
          <AdminRoute
            path="/addinventory"
            component={InventoryFormScreen}
          ></AdminRoute>
          <AdminRoute path="/sales" component={AllSalesScreen}></AdminRoute>
          <AdminRoute path="/message" component={BulkMailScreen}></AdminRoute>
          <AdminRoute path="/addsales" component={SalesFormScreen}></AdminRoute>
          <AdminRoute
            path="/inventorylist/:id"
            component={InventoryScreen}
          ></AdminRoute>
          <AdminRoute
            path="/inventories"
            component={InventoryListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/addproduct"
            component={CreateProductScreen}
          ></AdminRoute>
          <AdminRoute
            path="/findwishlist"
            component={FindWishlistScreen}
          ></AdminRoute>
          <Route path="/shop" component={AllProductsScreen}></Route>
          <Route path="/track" component={TrackOrderScreen}></Route>
          <AdminRoute
            path="/products/:id/edit"
            component={UpdateProductScreen}
          ></AdminRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <Route path="/cart" component={CartScreen}></Route>
          <Route path="/contact" component={ContactScreen}></Route>
          <Route path="/wishlist" component={WishlistScreen}></Route>
          <AdminRoute
            path="/variation/:id"
            component={VariationScreen}
          ></AdminRoute>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route
            path="/shippingmethod"
            component={ShippingMethodScreen}
          ></Route>

          <Route path="/placeorders" component={PlaceOrder}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </Box>
        <Footer />
        {!isLargerThan676 && <BottomNav />}
      </Box>
    </BrowserRouter>
  );
}

export default App;
