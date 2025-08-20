import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../reduxtollkit/UserSlice'; // với Login.js


const PRIMARY_COLOR = "#FFC107";

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading, error, isLoggedIn } = useSelector(state => state.user);
    const [email, setEmail] = useState("");
    const [password_hash, setPassword_hash] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
            alert("Đăng nhập thành công");
            navigation.navigate("Card"); // hoặc trang bạn muốn
        }
    }, [isLoggedIn]);

    const handleLogin = () => {
        dispatch(loginUser({ email: email, password_hash }));
    };
    // const handleLogin = async () => {
    //     try {
    //         // Nếu backend yêu cầu email, bạn cần nhập email thay vì username
    //         const response = await fetch("http://localhost:3000/api/login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email: email, password_hash })
    //         });
    //         const result = await response.json();
    //         if (response.ok) {
    //             alert("Đăng nhập thành công");
    //             // Chuyển hướng sang Home hoặc lưu thông tin user tuỳ ý
    //             navigation.navigate("Card");
    //         } else {
    //             alert("Lỗi: " + (result.message || "Đăng nhập thất bại"));
    //         }
    //     } catch (err) {
    //         alert("Lỗi: " + err.message);
    //     }
    // };

    return (
        <View style={styles.container}>
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
                        />
                    </View>
                    <View style={styles.boxText}>
                        <TextInput
                            placeholder="Nhập Mật khẩu"
                            placeholderTextColor="#fff"
                            secureTextEntry={true}
                            style={styles.inputText}
                            value={password_hash}
                            onChangeText={setPassword_hash}
                        />
                    </View>

                    <TouchableOpacity style={styles.boxTextLogin} onPress={handleLogin}>
                        <Text style={styles.bodyTextLogin}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.switchMode}
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={styles.switchText}>
                            Chưa có tài khoản? Đăng ký ngay
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {loading && <Text>Đang xử lý...</Text>}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
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