import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


const ProductCard = ({ imageUrl, name, price }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        width: 150,
        margin: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    info: {
        padding: 10,
    },
    name: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
});

export default ProductCard;