import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getProductById } from '../../reduxtollkit/ProductSlice';
const PRIMARY_COLOR = '#FFC107';
import LottieView from 'lottie-react-native';

const ProductDetail = ({ route, navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [price, setPrice] = useState(0);
  const [product, setProduct] = useState({});
  const id = route?.params?.id;
  console.log('id product:', id);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const isInteracting = useRef(false); // Theo dõi trạng thái tương tác

  // Animation opacity cho nút
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
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
      setQuantity(prev => prev + 1);
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
      setQuantity(prev => prev - 1);
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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.imageBox}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        </View>

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
        <View style={styles.productNameTag}>
          <Text style={styles.name}>{product.name}</Text>
        </View>
        <View style={styles.metaBox}>
          <Text style={styles.price}>Giá: {product.price}₫</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.des}>Mô tả sản phẩm:</Text>
          <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 'bold', color: '#333' }}>{product.name}</Text>
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
        <TouchableOpacity style={styles.addButton}>
          {loadingPrice ? (
            <LottieView
              source={require("../../assets/loading.json")} // file lottie loading
              autoPlay
              loop
              style={{ width: 100, height: 100, position: 'absolute' }}
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
    paddingTop: 40,
    backgroundColor: '#fff',
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
    gap: 10,
  },
  imagels: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 'auto',
  },
  productNameTag: {
    padding: 10,
    paddingVertical: 15,
    borderRadius: 12,
  },
  name: {
    fontSize: 15,
    color: '#333',
  },
  metaBox: {
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#2D6806',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  infoBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#cec9c9ff',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
    shadowColor: '#000',
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  des: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    height: 140,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  addText: {
    color: '#000000ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    justifyContent: 'center',
    width: '90%',
    height: 60,
    backgroundColor: '#FFC107',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    overflow: 'hidden',
  },
  containerQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    marginVertical: 20,
    marginBottom: '35%',
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: '#ffd64f5f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductDetail;