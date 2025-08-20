import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { supabase } from "../../config/supabase"; // import supabase client
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../reduxtollkit/CartSlice"; // clear cart sau khi order

const ConfirmCheckOut = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const cartItems = useSelector((state) => state.cart.productList);
  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {
    try {
      if (!form.name || !form.email || !form.phone || !form.address) {
        Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin trước khi đặt hàng");
        return;
      }

      // 1. Insert vào bảng orders
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: 1, // giả sử user_id là 1, sau này có thể lấy từ auth
            total_amount: totalAmount,
            status: "Success",
            order_date: new Date(),
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Insert vào order_items
      const orderItems = cartItems.map((item) => ({
        order_id: order.order_id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: orderItemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (orderItemsError) throw orderItemsError;

      // 3. Insert vào payments
      const { error: paymentError } = await supabase.from("payments").insert([
        {
          order_id: order.order_id,
          status: "Success",
          payment_date: new Date(),
        },
      ]);

      if (paymentError) throw paymentError;

      // ✅ Xóa giỏ hàng trong redux
      dispatch(clearCart());

      navigation.navigate("SuccessCheckOut");
    } catch (err) {
      console.error("Lỗi đặt hàng:", err);
      Alert.alert("Lỗi", "Đặt hàng thất bại, vui lòng thử lại!");
    }
  };

  // ✅ Tính tổng tiền để hiển thị
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
        {/* ✅ Danh sách sản phẩm */}
        {cartItems.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.productPrice}>
                {item.price.toLocaleString()}đ x {item.quantity}
              </Text>
            </View>
          </View>
        ))}

        {/* ✅ Tổng tiền */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng tiền:</Text>
          <Text style={styles.totalValue}>{totalAmount.toLocaleString()}đ</Text>
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
        <TouchableOpacity
          style={styles.buttonOrder}
          activeOpacity={0.7}
          onPress={handlePlaceOrder}
        >
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: "2%",
  },

  // ✅ style tổng tiền
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#FFC107",
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: "#FFC107",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  totalLabel: { fontSize: 18, fontWeight: "600", color: "#4C4C4C" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#E53935" },

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
    fontSize: 16,
    fontWeight: "600",
    color: "#4C4C4C",
    marginBottom: 6,
  },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "#41B100" },

  formContainer: { marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#FFC107",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    shadowColor: "#FFC107",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
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
