import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // thêm

const Navbar = () => {
  const navigation = useNavigation(); // lấy navigation từ hook

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        {/* Icon Home */}
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="home" size={30} color="#FFC107" />
        </TouchableOpacity>

        {/* Icon Cart */}
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Icon name="cart" size={30} color="#FFC107" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarContainer: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#FFC107',
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
