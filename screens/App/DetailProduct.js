import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { getProductById } from "../../reduxtollkit/ProductSlice";
const PRIMARY_COLOR = "#FFC107";
import LottieView from "lottie-react-native";
import { addToCart } from "../../reduxtollkit/CartSlice";

const DetailProduct = ({ route, navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [price, setPrice] = useState(0);
  const [product, setProduct] = useState({});
  const id = route?.params?.id;
  console.log("id product:", id);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const isInteracting = useRef(false); // Theo dõi trạng thái tương tác

  // Animation opacity cho nút
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  const { selectedItem } = useSelector((state) => state.products);
  useEffect(() => {
    if (selectedItem) {
      setProduct(selectedItem);
      setPrice(selectedItem.price || 0); // Cập nhật giá ban đầu
    }
  }, [selectedItem]);

  useEffect(() => {
    let newPrice = (product?.price || 0) * quantity;
    if (isInteracting.current) {
      setLoadingPrice(true);

      const timer = setTimeout(() => {
        setPrice(newPrice);
        setLoadingPrice(false);
        isInteracting.current = false;
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setPrice(newPrice);
    }
  }, [quantity, product?.price]);

  const increase = () => {
    if (!isInteracting.current) {
      isInteracting.current = true;
      Animated.timing(opacity, {
        toValue: 0.6,
        duration: 100,
        useNativeDriver: true,
      }).start();
      setQuantity((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1 && !isInteracting.current) {
      isInteracting.current = true;
      Animated.timing(opacity, {
        toValue: 0.6,
        duration: 100,
        useNativeDriver: true,
      }).start();
      setQuantity((prev) => prev - 1);
    }
  };

  // Reset opacity khi hết tương tác
  useEffect(() => {
    if (!loadingPrice) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [loadingPrice]);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.imageBox}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.imageBoxls}>
          <View style={styles.imageBox}>
            <Image
              source={{ uri: product.image }}
              style={styles.imagels}
              resizeMode="contain"
            />
          </View>
          <View style={styles.imageBox}>
            <Image
              source={{ uri: product.image }}
              style={styles.imagels}
              resizeMode="contain"
            />
          </View>
          <View style={styles.imageBox}>
            <Image
              source={{ uri: product.image }}
              style={styles.imagels}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.productNameTag}>
          <Text style={styles.name}>{product.name}</Text>
        </View>
        <View style={styles.metaBox}>
          <Text style={styles.price}>Giá: {product.price}₫</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.des}>Mô tả sản phẩm:</Text>
          <Text
            style={{
              fontSize: 14,
              fontStyle: "italic",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {product.name}
          </Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <View style={styles.containerQuantity}>
          <TouchableOpacity
            style={[styles.button, { opacity }]}
            onPress={decrease}
            disabled={loadingPrice}
          >
            <Ionicons name="remove" size={20} color="#FFC107" />
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FFC107", opacity }]}
            onPress={increase}
            disabled={loadingPrice}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            dispatch(
              addToCart({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity,
              })
            );
            navigation.navigate("Cart");
          }}
        >
          {loadingPrice ? (
            <LottieView
              source={require("../../assets/loading.json")}
              autoPlay
              loop
              style={{ width: 100, height: 100, position: "absolute" }}
            />
          ) : (
            <Text style={styles.addText}>
              Thêm vào giỏ hàng - {price.toLocaleString()}₫
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFC107",
    height: 80,
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
    color: "#fff",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    width: "80%",
    textAlign: "center",
  },

  imageBox: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  image: {
    width: "90%",
    height: 220,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFC107",
  },

  imageBoxls: {
    paddingHorizontal: 30,
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  imagels: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFC107",
  },

  productNameTag: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4C4C4C",
  },

  metaBox: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#41B100", // ✅ xanh lá giống Cart
    fontWeight: "bold",
  },

  infoBox: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 15,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFC107",
    marginBottom: 15,
  },
  des: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 18,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },

  containerQuantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    gap: 20,
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#BDBDBD",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    width: 40,
    height: 35,
    textAlign: "center",
    lineHeight: 35,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  footer: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: "#FFC107",
    borderRadius: 12,
  },
  addText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailProduct;
