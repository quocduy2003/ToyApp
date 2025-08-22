import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../reduxtollkit/UserSlice';

const PRIMARY_COLOR = "#FFC107";

const Login = ({ navigation, route }) => {
    const [email, setEmail] = useState(""); // Sử dụng email thay vì username
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const { loading, error, isLoggedIn } = userState || { loading: false, error: null, isLoggedIn: false };

    // Kiểm tra xem có phải đang mở như modal không
    const isModal = route?.name === 'LoginModal';

    useEffect(() => {
        if (isLoggedIn) {
            if (isModal) {
                // Nếu là modal, đóng modal và quay về màn hình trước
                navigation.goBack();
            } else {
                // Nếu không phải modal, navigate bình thường
                navigation.navigate("Home");
            }
        }
    }, [isLoggedIn, navigation, isModal]);

    const handleLogin = async () => {
        if (!email || !password) {
            return;
        }

        try {
            await dispatch(loginUser({ email, password })).unwrap();
        } catch (err) {
            console.error("Login error:", err);
        }
    };




    return (
        <View style={styles.container}>
            {isModal && (
                <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            )}
            
            <View style={styles.boxContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Đăng nhập</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.boxText}>
                        <TextInput
                            placeholder="Nhập Tài khoản"
                            placeholderTextColor="#fff"
                            style={styles.inputText}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.boxText}>
                        <TextInput
                            placeholder="Nhập Mật khẩu"
                            placeholderTextColor="#fff"
                            secureTextEntry={true}
                            style={styles.inputText}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.boxTextLogin} onPress={handleLogin} disabled={loading}>
                        <Text style={styles.bodyTextLogin}>
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.switchMode}
                        onPress={() => {
                            if (isModal) {
                                navigation.navigate("RegisterModal");
                            } else {
                                navigation.navigate("Register");
                            }
                        }}
                    >
                        <Text style={styles.switchText}>
                            Chưa có tài khoản? Đăng ký ngay
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {error && <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text>}
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
        padding: 10,
    },
    boxContainer: {
        width: '100%',
        maxWidth: 400,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 34,
        color: 'white',
        fontWeight: 'bold',
    },
    body: {
        width: '100%',
        alignItems: 'center',
    },
    boxText: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 30,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    inputText: {
        width: '100%',
        height: '100%',
        fontWeight: 'bold',
        color: '#fafafa',
    },
    boxTextLogin: {
        width: '100%',
        height: 50,
        backgroundColor: '#2D6806',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    bodyTextLogin: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    switchMode: {
        marginTop: 10,
    },
    switchText: {
        color: '#fff',
        fontSize: 14,
    },
});
