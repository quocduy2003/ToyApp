import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Navbar from "../components/Navbar";

const Card = ({ navigation }) => {
  const [productList, setProductList] = useState([
    {
      id: "1",
      name: "Mô Hình OnePiece zoro Chiến Đấu Siêu Ngầu Cao : 33cm nặng : 1000gram - One Piece - Hộp Carton -K14-T4-S3",
      price: 100000,
      quantity: 1,
      image:
        "https://bizweb.dktcdn.net/100/418/981/products/1-a5c3dbe3-1a34-4618-b43e-104276627c3c.jpg?v=1755068078660",
    },
    {
      id: "2",
      name: "Mô Hình OnePiece zoro Chiến Đấu Siêu Ngầu Cao : 23.5cm nặng : 1000gram - One Piece - Hộp Màu K17-T4-S7",
      price: 150000,
      quantity: 1,
      image:
        "https://bizweb.dktcdn.net/100/418/981/products/1-2717f3b8-0397-4ab3-8c5b-6bf183ee82b2.jpg?v=1755138997937",
    },
    {
      id: "3",
      name: "Mô Hình OnePiece Sanji chiến đấu siêu ngầu Cao : 28.5cm nặng 1800g - One Piece - Full Box - Hộp Màu - K13-T4-S4-S5 (G-12)",
      price: 120000,
      quantity: 1,
      image:
        "https://bizweb.dktcdn.net/100/418/981/products/1-d9acd1c3-95a7-43f9-aa1f-79c42ab719a3.jpg?v=1755067614440",
    },
    {
      id: "4",
      name: "Mô Hình OnePiece luffy gear 4 nắm đấm to - cao 20cm - nặng 450gram - Figure One Piece - Hộp Màu - K13-T4-S6",
      price: 120000,
      quantity: 1,
      image:
        "https://bizweb.dktcdn.net/100/418/981/products/1-1c30b67e-021a-4968-8a3f-eb9914e94ac9.jpg?v=1754995322830",
    },
  ]);

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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />

              <View style={styles.cardContent}>
                <View style={styles.bodyContent}>
                  <Text style={styles.nameProdcut}>{item.name}</Text>
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
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.pressDecreaseOperatorContainer}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.deleteContainer}>
                    <TouchableOpacity
                      style={styles.pressDeleteOperatorContainer}
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
          <Text style={styles.paymentText}>đ</Text>
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

export default Card;

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
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    shadowColor: "#FFC107",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#FFC107",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  cardContent: { flex: 1 },
  bodyContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  nameProdcut: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4C4C4C",
    flexShrink: 1,
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
