import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const ConfirmCheckOut = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const productInfo = {
    name: "Mô Hình OnePiece zoro Chiến Đấu Siêu Ngầu Cao : 23.5cm nặng : 1000gram - One Piece - Hộp Màu K17-T4-S7",
    price: 150000,
    image:
      "https://bizweb.dktcdn.net/100/418/981/products/1-2717f3b8-0397-4ab3-8c5b-6bf183ee82b2.jpg?v=1755138997937",
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-back"
          style={styles.arrowBack}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Xác nhận thanh toán</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Thông tin sản phẩm */}
        <View style={styles.productCard}>
          <Image
            source={{ uri: productInfo.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.productName}>{productInfo.name}</Text>
            <Text style={styles.productPrice}>
              {productInfo.price.toLocaleString()}đ
            </Text>
          </View>
        </View>

        {/* Form nhập thông tin */}
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Họ và tên"
            style={styles.input}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <TextInput
            placeholder="Số điện thoại"
            style={styles.input}
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(text) => setForm({ ...form, phone: text })}
          />
          <TextInput
            placeholder="Địa chỉ"
            style={[styles.input, { height: 80 }]}
            multiline
            value={form.address}
            onChangeText={(text) => setForm({ ...form, address: text })}
          />
        </View>
      </ScrollView>

      {/* Nút đặt hàng */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonOrder} activeOpacity={0.7} onPress={() => navigation.navigate("SuccessCheckOut")}>
          <Text style={styles.textButton}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmCheckOut;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: {
    backgroundColor: "#FFC107",
    flexDirection: "row",
    alignItems: "center",
    height: 80,
  },
  arrowBack: { fontSize: 25, color: "#fff", paddingLeft: "5%" },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginLeft: '2%',  },

  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFC107",
    padding: 12,
    marginBottom: 16,
    shadowColor: "#FFC107",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  productImage: { width: 80, height: 80, borderRadius: 10, marginRight: 12 },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4C4C4C",
    marginBottom: 6,
  },
  productPrice: { fontSize: 16, fontWeight: "bold", color: "#41B100" },

  formContainer: { marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },

  footer: { padding: 16 },
  buttonOrder: {
    backgroundColor: "#FFC107",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  textButton: { fontSize: 20, fontWeight: "bold", color: "#fff" },
});
