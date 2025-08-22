import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../reduxtollkit/UserSlice';
import { useAuthNavigation } from '../../utils/navigation';

const IntroHeader = ({ navigation }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const user = userState?.user;
  const { isLoggedIn, navigateToLogin, navigateToProfile } = useAuthNavigation();
  
  // Avatar mặc định
  const defaultAvatar = 'https://i.guim.co.uk/img/media/327aa3f0c3b8e40ab03b4ae80319064e401c6fbc/377_133_3542_2834/master/3542.jpg?width=620&dpr=1&s=none&crop=none';
  
  const userName = user?.full_name || user?.email?.split('@')[0] || 'User';
  const userAvatar = user?.avatar_url || defaultAvatar;

  useEffect(() => {
    // Lấy thông tin user khi component mount
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  const handleAvatarPress = () => {
    if (user) {
      navigateToProfile();
    } else {
      navigateToLogin();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        margin: 8
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <TouchableOpacity onPress={handleAvatarPress}>
            <Image 
              source={{ uri: userAvatar }} 
              style={{ width: 45, height: 45, borderRadius: 99 }} 
            />
          </TouchableOpacity>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'outfit-bold',
            marginLeft: 10
          }}>Hello, {userName}</Text>
        </View>
        
        {!user && (
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity 
              style={styles.loginBtn}
              onPress={navigateToLogin}
            >
              <Text style={styles.authBtnText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
        <TouchableOpacity
          style={styles.searchBox}
          activeOpacity={0.8}
          onPress={() =>  navigation.navigate('SearchScrean')}
        >
          <View style={styles.searchInput}>
            <Text>Tìm kiếm sản phẩm...</Text>
          </View>
          <Ionicons name="search" size={22} color="black" />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default IntroHeader

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#ffc107b1',
  },
  searchBox: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: '90%',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    fontSize: 16,
  },
  authButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  loginBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  authBtnText: {
    color: '#FFC107',
    fontSize: 12,
    fontWeight: 'bold',
  },
})