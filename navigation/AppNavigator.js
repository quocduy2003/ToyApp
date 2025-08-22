import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/App/Cart";
import CategoryFull from "../screens/App/CategoryFull";
import ConfirmCheckOut from "../screens/App/ConfirmCheckOut";
import DetailProduct from "../screens/App/DetailProduct";
import Home from "../screens/App/Home";
import ProfileUser from "../screens/App/ProfileUser";
import SearchResults from "../screens/App/SearchResults";
import SearchScrean from "../screens/App/SearchScrean";
import SuccessCheckOut from "../screens/App/SuccessCheckOut";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ConfirmCheckOut" component={ConfirmCheckOut} />
      <Stack.Screen name="SuccessCheckOut" component={SuccessCheckOut} />
      <Stack.Screen name="DetailProduct"  component={DetailProduct} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CategoryFull" component={CategoryFull} />
      <Stack.Screen name="SearchScrean" component={SearchScrean} />
      <Stack.Screen name="ResultScreen" component={SearchResults} />
      <Stack.Screen name="ProfileUser" component={ProfileUser} />
      
      {/* Auth screens - có thể truy cập như modal */}
      <Stack.Screen 
        name="LoginModal" 
        component={Login} 
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="RegisterModal" 
        component={Register} 
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;