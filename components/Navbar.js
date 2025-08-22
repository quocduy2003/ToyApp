import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthNavigation } from '../utils/navigation';

const Navbar = () => {
  const navigation = useNavigation();
  const { isLoggedIn, navigateToLogin, navigateToRegister, navigateToProfile } = useAuthNavigation();

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

        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          /* Icon Profile - hiển thị khi đã đăng nhập */
          <TouchableOpacity onPress={navigateToProfile}>
            <Icon name="person" size={30} color="#FFC107" />
          </TouchableOpacity>
        ) : (
          /* Nút đăng nhập/đăng ký - hiển thị khi chưa đăng nhập */
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={navigateToLogin}
            >
              <Text style={styles.authButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={navigateToRegister}
            >
              <Text style={styles.authButtonText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    height: 70,
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
  authButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  loginButton: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  registerButton: {
    backgroundColor: '#2D6806',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  authButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
