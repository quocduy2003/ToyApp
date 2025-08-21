import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Card from "../screens/App/Card";
import ConfirmCheckOut from "../screens/App/ConfirmCheckOut";
import SuccessCheckOut from "../screens/App/SuccessCheckOut";
import ProductDetail from "../screens/App/DetailProduct";
import Home from "../screens/App/Home";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Card" component={Card} />
      <Stack.Screen name="ConfirmCheckOut" component={ConfirmCheckOut} />
      <Stack.Screen name="SuccessCheckOut" component={SuccessCheckOut} />
      <Stack.Screen name="ProductDetail"  component={ProductDetail} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppNavigator;