import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../reduxtollkit/CartSlice";

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const { productList, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProducts()); // load dữ liệu từ Supabase khi vào giỏ hàng
  }, [dispatch]);

  if (loading) return <Text>Đang tải dữ liệu...</Text>;
  if (error) return <Text>Lỗi: {error}</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-back"
          style={styles.arrowBack}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Giỏ hàng</Text>
        </View>
      </View>

      {/* Danh sách sản phẩm */}
      <View style={styles.bodyContainer}>
        <FlatList
          data={productList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />

              <View style={styles.cardContent}>
                <View style={styles.bodyContent}>
                  <Text style={styles.nameProdcut} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                  <Text style={styles.totalPriceProdcut}>
                    {(item.price * item.quantity).toLocaleString()}đ
                  </Text>
                </View>

                <View>
                  <Text style={styles.priceProdcut}>
                    {item.price.toLocaleString()}đ
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <View style={styles.operatorContainer}>
                    <TouchableOpacity
                      style={styles.pressIncreaseOperatorContainer}
                      onPress={() => dispatch(decreaseQuantity(item.id))}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.pressDecreaseOperatorContainer}
                      onPress={() => dispatch(increaseQuantity(item.id))}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.deleteContainer}>
                    <TouchableOpacity
                      style={styles.pressDeleteOperatorContainer}
                      onPress={() => dispatch(removeItem(item.id))}
                    >
                      <Text style={styles.textDelete}>Xoá</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.paymentTextContainer}>
          <Text style={styles.paymentText}>Tổng</Text>
          <Text style={styles.paymentText}>
            {productList
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toLocaleString()}
            đ
          </Text>
        </View>
      </View>

      <View style={styles.paymentContainer}>
        <TouchableOpacity
          style={styles.buttonPaymentContainer}
          activeOpacity={0.1}
          onPress={() => navigation.navigate("ConfirmCheckOut")}
        >
          <Text style={styles.buttonPayment}>Thanh toán</Text>
        </TouchableOpacity>
      </View>

      <Navbar />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    backgroundColor: "#FFC107",
    flexDirection: "row",
    alignItems: "center",
    height: 80,
  },
  arrowBack: {
    fontSize: 25,
    color: "#fff",
    paddingLeft: "5%",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    paddingRight: "10%",
  },
  bodyContainer: { flex: 9 },
  cardItem: {
  flexDirection: "row",
  backgroundColor: "#fff",
  marginHorizontal: 12,
  marginVertical: 6,
  padding: 10,
  borderRadius: 10,
  shadowColor: "#FFC107",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
  borderWidth: 1,
  borderColor: "#FFC107",
  height: 100, // ✅ chiều cao cố định cho mỗi cart item
},
productImage: {
  width: 70,
  height: 70,
  borderRadius: 8,
  marginRight: 10,
  alignSelf: "center", // ✅ căn giữa theo chiều dọc
},
  cardContent: {
  flex: 1,
  justifyContent: "space-between", // ✅ để nội dung không bị dính sát nhau
},
  bodyContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  nameProdcut: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#4C4C4C",
  flexShrink: 1,
  numberOfLines: 1, // ✅ chỉ hiển thị 1 dòng
  ellipsizeMode: "tail", // ✅ nếu dài quá thì thêm "..."
},
  totalPriceProdcut: {
    fontSize: 18,
    color: "#41B100",
    fontWeight: "bold",
  },
  priceProdcut: {
    fontSize: 16,
    color: "#777",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  operatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressIncreaseOperatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
  },
  pressDecreaseOperatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
  },
  quantity: {
    fontSize: 16,
    textAlign: "center",
    width: 50,
    height: 40,
    lineHeight: 40,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    backgroundColor: "#fff",
  },
  deleteContainer: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    padding: 5,
  },
  pressDeleteOperatorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textDelete: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  footerContainer: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
  paymentTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 50,
    alignItems: "center",
  },
  paymentText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  paymentContainer: { flex: 1, justifyContent: "center", marginBottom: 24 },
  buttonPaymentContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 12,
    borderColor: "#FFC107",
    borderWidth: 1,
  },
  buttonPayment: { fontSize: 22, color: "#FFC107", fontWeight: "bold" },
});
