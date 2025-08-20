import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/App/Cart";
import ConfirmCheckOut from "../screens/App/ConfirmCheckOut";
import SuccessCheckOut from "../screens/App/SuccessCheckOut";
import Home from "../screens/App/Home";
import Register from "../screens/Auth/Register";
import Login from "../screens/Auth/Login";
import DetailProduct from "../screens/App/DetailProduct";

const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator initialRouteName="Cart" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ConfirmCheckOut" component={ConfirmCheckOut} />
      <Stack.Screen name="SuccessCheckOut" component={SuccessCheckOut} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DetailProduct" component={DetailProduct} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default ProductStack;