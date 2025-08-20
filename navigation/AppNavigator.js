import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Card from "../screens/App/Card";
import ConfirmCheckOut from "../screens/App/ConfirmCheckOut";
import SuccessCheckOut from "../screens/App/SuccessCheckOut";
import Navbar from "../components/Navbar";
import Home from "../screens/App/Home";

const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator initialRouteName="Card" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Card" component={Card} />
      <Stack.Screen name="Navbar" component={Navbar} />
      <Stack.Screen name="ConfirmCheckOut" component={ConfirmCheckOut} />
      <Stack.Screen name="SuccessCheckOut" component={SuccessCheckOut} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default ProductStack;