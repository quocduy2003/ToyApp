import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../config/supabase';

const PRIMARY_COLOR = "#FFC107";

const Register = ({ navigation, route }) => {
    const [full_name, setFull_name] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState(""); // Thêm trường address

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Kiểm tra xem có phải đang mở như modal không
    const isModal = route?.name === 'RegisterModal';

const handleRegister = async () => {
    setError("");
    if (!email || !password || !full_name || !phone || !address) {
        setError("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    try {
        setLoading(true);
        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name,
                    phone,
                    address,
                },
            },
        });

        if (signUpError) {
            setError(signUpError.message);
        } else {
            // Sau khi đăng ký thành công, insert vào bảng users
            const { error: insertError } = await supabase.from('users').insert({
                full_name,
                email,
                phone,
                address,
                created_at: new Date().toISOString(),
            });

            if (insertError) {
                setError(insertError.message);
            } else {
                alert("Thành công", "Đăng ký thành công, vui lòng kiểm tra email để xác nhận!");
                if (isModal) {
                    navigation.navigate("LoginModal");
                } else {
                    navigation.navigate("Login");
                }
            }
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
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
                    <Text style={styles.headerText}>Đăng Ký</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.boxText}>
                        <TextInput
                            placeholder="Nhập Họ và tên"
                            placeholderTextColor="#fff"
                            style={styles.inputText}
                            value={full_name}
                            onChangeText={setFull_name}
                        />
                    </View>

                    <View style={styles.boxText}>
                        <TextInput
                            placeholder="Nhập Số điện thoại"
                            placeholderTextColor="#fff"
                            keyboardType="phone-pad"
                            style={styles.inputText}
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <View style={styles.boxText}>
                        <TextInput
                            placeholder="Nhập Email"
                            placeholderTextColor="#fff"
                            keyboardType="email-address"
                            style={styles.inputText}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.boxText}>
                        <TextInput
                            placeholder="Nhập Địa chỉ"
                            placeholderTextColor="#fff"
                            style={styles.inputText}
                            value={address}
                            onChangeText={setAddress}
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

                    <TouchableOpacity style={styles.boxTextLogin} onPress={handleRegister} disabled={loading}>
                        <Text style={styles.bodyTextLogin}>{loading ? "Đang xử lý..." : "Sign up"}</Text>
                    </TouchableOpacity>

                    {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

                    <TouchableOpacity
                        style={styles.switchMode}
                        onPress={() => {
                            if (isModal) {
                                navigation.navigate("LoginModal");
                            } else {
                                navigation.navigate("Login");
                            }
                        }}
                    >
                        <Text style={styles.switchText}>
                            Already have an account? Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Register;

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