import * as React from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Navbar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Icon name="home" size={30} color="#FFC107" />
                <Icon name="cart" size={30} color="#FFC107" />
            </View>
        </View>
    );
};

export default Navbar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navbarContainer: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#FFC107',
        padding: 16,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
});
