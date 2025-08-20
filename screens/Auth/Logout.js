import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../config/supabase';

const Logout = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Nếu có trường full_name trong user metadata thì lấy, không thì lấy email
        setUserName(user.user_metadata?.full_name || user.email);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userText}>Xin chào, {userName}</Text>
      <Text style={styles.text}>Bạn có chắc muốn đăng xuất?</Text>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Logout;