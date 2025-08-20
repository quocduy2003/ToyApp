
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Navbar from '../components/Navbar';
import { Ionicons } from '@expo/vector-icons'; // Nếu chưa có, dùng icon mặc định
const PRIMARY_COLOR = '#FFC107';

const ProductDetail = ({ route, navigation }) => {

  const sampleProduct = {
    name: 'Xe Đồ Chơi Điều Khiển',
    price: 299000,
    description: 'Xe đồ chơi điều khiển từ xa, tốc độ cao, pin sạc, phù hợp cho trẻ em từ 6 tuổi trở lên.',
    image: 'https://bizweb.dktcdn.net/100/418/981/products/1-a5c3dbe3-1a34-4618-b43e-104276627c3c.jpg?v=1755068078660',
    quantity: 12,
    category: 'Dragon ball',
  };

  const product = route?.params?.product || sampleProduct;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Thanh search và icon profile */}
        <View style={styles.topBar}>
          <View style={styles.searchBox}>
            <TextInput style={styles.searchInput} placeholder="Tìm kiếm sản phẩm..." />
          </View>
          <TouchableOpacity style={styles.profileIcon}>
            <Ionicons name="person-circle-outline" size={36} color="#333" />
          </TouchableOpacity>
        </View>


        <View style={styles.productNameTag}>
          <Text style={styles.name}>{product.name}</Text>
        </View>


        {/* Ảnh sản phẩm với tên ở góc */}
        <View style={styles.imageBox}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        </View>
        {/*List ảnh sản phẩm */}
        <View style={styles.imageBoxls}>
          <View style={styles.imageBox}>
            <Image source={{ uri: product.image }} style={styles.imagels} resizeMode="contain" />
          </View>
          <View style={styles.imageBox}>
            <Image source={{ uri: product.image }} style={styles.imagels} resizeMode="contain" />
          </View>
          <View style={styles.imageBox}>
            <Image source={{ uri: product.image }} style={styles.imagels} resizeMode="contain" />
          </View>
        </View>

        {/* Số lượng và danh mục */}
        <View style={styles.metaBox}>
          <Text style={styles.price}>Giá: {product.price}₫</Text>
          <Text style={styles.metaText}>Số lượng: {product.quantity}</Text>
          <Text style={styles.metaText}>Danh mục: {product.category}</Text>
        </View>

        {/* Khung mô tả */}
        <View style={styles.infoBox}>
          <Text style={styles.description}><Text style={styles.des}>Mô tả:</Text> {product.description}</Text>
        </View>

        {/* Nút mua hàng ở góc Navbar */}
        <View style={styles.buyBox}>
          <TouchableOpacity style={styles.buyButton} onPress={() => navigation.navigate('ConfirmCheckOut', { product })}>
            <Text style={styles.buyButtonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>

        {/* Navbar ở dưới cùng */}
      </ScrollView>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchBox: {
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
    fontSize: 16,
  },
  profileIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    width: '90%',
    height: 220,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  imageBoxls: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    gap: 10, // khoảng cách đều giữa các con
  },

  imagels: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: "auto",
  },

  productNameTag: {
    top: 10,
    left: 25,
    paddingVertical: 15,
    borderRadius: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  metaBox: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  metaText: {
    fontSize: 15,
    color: '#2D6806',
    fontWeight: 'bold',
  },
  infoBox: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  price: {
    fontSize: 18,
    color: '#2D6806',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
  },
  des: {
    fontWeight: 'bold',
    color: '#2D6806',
  },
  buyBox: {
    alignItems: 'center',
    top: '10%',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#5eda45ff',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    minWidth: 300,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetail;