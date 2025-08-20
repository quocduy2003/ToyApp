import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Card from "../screens/App/Card";
import ConfirmCheckOut from "../screens/App/ConfirmCheckOut";
import SuccessCheckOut from "../screens/App/SuccessCheckOut";
import Navbar from "../components/Navbar";
import Home from "../screens/App/Home";
import Register from "../screens/Auth/Register";
import Login from "../screens/Auth/Login";

const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator initialRouteName="Card" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Card" component={Card} />
      <Stack.Screen name="Navbar" component={Navbar} />
      <Stack.Screen name="ConfirmCheckOut" component={ConfirmCheckOut} />
      <Stack.Screen name="SuccessCheckOut" component={SuccessCheckOut} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default ProductStack;