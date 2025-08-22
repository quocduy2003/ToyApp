import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

// Hook để xử lý navigation giữa App và Auth stacks
export const useAuthNavigation = () => {
  const navigation = useNavigation();
  const userState = useSelector((state) => state.user);
  const isLoggedIn = userState?.isLoggedIn || false;

  const navigateToLogin = () => {
    if (isLoggedIn) {
      return;
    }
    
    try {
      // Navigate đến LoginModal trong AppNavigator
      navigation.navigate('LoginModal');
    } catch (error) {
      console.error('Error navigating to login:', error);
    }
  };

  const navigateToRegister = () => {
    if (isLoggedIn) {
      return;
    }
    
    try {
      // Navigate đến RegisterModal trong AppNavigator
      navigation.navigate('RegisterModal');
    } catch (error) {
      console.error('Error navigating to register:', error);
    }
  };

  const navigateToProfile = () => {
    if (!isLoggedIn) {
      navigateToLogin();
      return;
    }
    
    navigation.navigate('ProfileUser');
  };

  return {
    isLoggedIn,
    navigateToLogin,
    navigateToRegister,
    navigateToProfile,
  };
};
