import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/App/Cart";
import ConfirmCheckOut from "../screens/App/ConfirmCheckOut";
import SuccessCheckOut from "../screens/App/SuccessCheckOut";
import DetailProduct from "../screens/App/DetailProduct";
import Home from "../screens/App/Home";
import CategoryFull from "../screens/App/CategoryFull";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Cart" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ConfirmCheckOut" component={ConfirmCheckOut} />
      <Stack.Screen name="SuccessCheckOut" component={SuccessCheckOut} />
      <Stack.Screen name="DetailProduct"  component={DetailProduct} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CategoryFull" component={CategoryFull} />
    </Stack.Navigator>
  );
};

export default AppNavigator;