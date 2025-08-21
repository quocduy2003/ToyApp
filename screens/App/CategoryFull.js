import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../reduxtollkit/CategorySlice";
import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  getNewestProducts,
  getFeaturedProducts,
  fetchBestSellers,
} from "../../reduxtollkit/ProductSlice";

const screenWidth = Dimensions.get("window").width;
const itemSize = screenWidth / 4 - 16;

const CategoryFull = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    list: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);
  const { newest, newestStatus } = useSelector((state) => state.products);
  const { featured, featuredStatus } = useSelector((state) => state.products);
  const { bestSellers, bestSellerStatus } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getNewestProducts());
    dispatch(getFeaturedProducts());
    dispatch(fetchBestSellers());
  }, [dispatch]);

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <Icon
            name="arrow-back"
            style={styles.arrowBack}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Danh mục sản phẩm</Text>
        </View>
      </View>

      {/* Nội dung */}
      <ScrollView style={styles.container}>
        {/* Danh mục */}
        <View style={{ marginVertical: 10 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#FFC107" />
          ) : error ? (
            <Text style={{ color: "red" }}>Lỗi: {error}</Text>
          ) : (
            <FlatList
              data={categories}
              keyExtractor={(item) => item.category_id.toString()} // hoặc category_id nếu bảng bạn đặt vậy
              numColumns={4}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.categoryCard}>
                  {/* Hiển thị ảnh từ Supabase */}
                  <Image
                    source={{ uri: item.category_image }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                  {/* Tên danh mục */}
                  <Text style={styles.categoryText} numberOfLines={1}>
                    {item.category_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        {/* 🥇 Sản phẩm bán chạy */}
        <Text style={styles.sectionTitle}>🥇 Sản phẩm bán chạy</Text>
        {bestSellerStatus === "loading" ? (
          <ActivityIndicator size="large" color="#FFC107" />
        ) : (
          <FlatList
            data={bestSellers}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("DetailProduct", { id: item.id })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>
                  {item.price.toLocaleString()}đ
                </Text>
                <Text style={{ fontSize: 12, color: "#888" }}>
                  Đã bán: {item.totalQuantity}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
        {/* 🆕 Sản phẩm mới nhất */}
        <Text style={styles.sectionTitle}>🆕 Sản phẩm mới nhất</Text>
        <FlatList
          data={newest}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() =>
                navigation.navigate("DetailProduct", { id: item.id })
              }
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.productPrice}>
                {item.price.toLocaleString()}đ
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* 🔥 Sản phẩm nổi bật */}
        <Text style={styles.sectionTitle}>🔥 Sản phẩm nổi bật</Text>
        {featuredStatus === "loading" ? (
          <ActivityIndicator size="large" color="#FFC107" />
        ) : featuredStatus === "failed" ? (
          <Text style={{ color: "red" }}>Lỗi load sản phẩm nổi bật</Text>
        ) : (
          <FlatList
            data={featured}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("DetailProduct", { id: item.id })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>
                  {item.price.toLocaleString()}đ
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </ScrollView>

      <Navbar />
    </View>
  );
};

export default CategoryFull;

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#f9f9f9" },
  header: { backgroundColor: "#FFC107" },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
  },
  arrowBack: { fontSize: 28, color: "#fff", marginRight: 12 },
  headerTitle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    width: "80%",
    textAlign: "center",
  },
  container: { flex: 1, paddingHorizontal: 12 },

  // Category
  categoryCard: {
    width: itemSize,
    height: itemSize,
    margin: 5.7,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4C4C4C",
    textAlign: "center",
    width: "70%",
  },

  // Section
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#FFC107",
  },

  // Product card
  productCard: {
    backgroundColor: "#fff",
    marginRight: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    width: 160,
    borderWidth: 1,
    borderColor: "#FFC107",
    shadowColor: "#FFC107",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  productImage: { width: "100%", height: 110, borderRadius: 8 },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    color: "#4C4C4C",
  },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "#41B100" },
});
