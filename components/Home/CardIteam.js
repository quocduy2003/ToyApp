import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


const ProductCard = ({ imageUrl, name, price }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{name}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 170,
    marginBottom: 15,
    padding: 5,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  info: {
    padding: 8,
  },
  name: {
    maxWidth: '100%',
    fontSize: 12,
    color: '#333',
  },
  price: {
    fontSize: 14,
    paddingTop: 5,
    color: '#e6ae08ff',
    fontWeight: 'bold',
  },
});


export default ProductCard;